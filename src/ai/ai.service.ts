import { Injectable, BadRequestException } from '@nestjs/common';
import axios from 'axios';

import { GenerateRoutineDto } from './dto/generate-routine.dto';
import { RoutineResponseDto } from './dto/routine-response.dto';
import { RutinasService } from '../rutinas/rutinas.service';

@Injectable()
export class AiService {
  constructor(private rutinasService: RutinasService) {}

  async generateRoutine(
    user: GenerateRoutineDto,
  ): Promise<RoutineResponseDto> {
    const prompt = `
Eres un entrenador personal altamente especializado en fitness y acondicionamiento físico.

Tu tarea es crear una rutina de entrenamiento completamente personalizada basada en los datos del usuario.

DATOS DEL USUARIO:
- Edad: ${user.age} años
- Peso: ${user.weight} kg
- Altura: ${user.height} cm
- Objetivo: ${user.goal}
- Nivel de experiencia: ${user.level}
- Equipo disponible: ${user.equipment}

REGLAS IMPORTANTES:
1. Responde SOLO con JSON válido, sin markdown ni explicaciones
2. Crea una rutina de 5 días de entrenamiento
3. Cada día debe ser específico y progresivo

ADAPTACIÓN SEGÚN OBJETIVO:
- Si el objetivo es "perder grasa": incluye más cardio, ejercicios de alta intensidad, déficit calórico moderado
- Si es "ganar músculo": enfócate en fuerza, progresión de peso, volumen moderado-alto
- Si es "resistencia": circuitos largos, ejercicios cardiovasculares, menos descanso
- Si es "fuerza": enfoque en movimientos compuestos, series de baja repetición, descansos largos

ADAPTACIÓN SEGÚN NIVEL:
- Principiante: ejercicios básicos, menos volumen, técnica prioritaria
- Intermedio: variedad de ejercicios, volumen moderado, progresión consistente
- Avanzado: ejercicios complejos, mayor volumen, periodización, técnicas avanzadas

ADAPTACIÓN SEGÚN EQUIPO:
- Sin equipo: ejercicios de peso corporal, isométricos
- Mancuernas: énfasis en levantamiento de pesas
- Gimnasio completo: todos los tipos de ejercicios
- Cardio: máquinas o actividades cardiovasculares

FORMATO ESPERADO (JSON VÁLIDO):
{
  "week": [
    {
      "day": "Lunes",
      "focus": "Tipo de entrenamiento",
      "exercises": [
        {
          "name": "Nombre del ejercicio",
          "sets": "3",
          "reps": "10"
        }
      ]
    }
  ]
}

Responde SOLO con el JSON, sin usar markdown (sin \`\`\`json).
`;

    try {
      const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'system',
              content:
                'Eres un entrenador personal experto que crea rutinas fitness personalizadas. Responde SOLO con JSON válido, sin markdown, sin explicaciones, sin texto adicional.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 2048,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
            'Content-Type': 'application/json',
          },
          timeout: 30000,
        },
      );

      let content = '';
      try {
        content = response.data.choices[0].message.content.trim();

        // Limpiar posibles caracteres markdown
        const cleanContent = content
          .replace(/^```json\n/, '')
          .replace(/\n```$/, '')
          .replace(/^```\n/, '')
          .replace(/\n```$/, '');

        const parsedResponse = JSON.parse(cleanContent);

        // Validar que la respuesta tiene la estructura esperada
        if (!parsedResponse.week || !Array.isArray(parsedResponse.week)) {
          throw new Error('Estructura de respuesta inválida');
        }

        return parsedResponse as RoutineResponseDto;
      } catch (parseError) {
        console.error('Error parsing AI response:', content);
        throw new BadRequestException(
          'La IA devolvió un JSON inválido. Por favor, intenta de nuevo.',
        );
      }
    } catch (error: any) {
      console.error('Error calling Groq API:', error);

      if (error.response?.status === 401) {
        throw new BadRequestException('API key de Groq inválida o expirada');
      }

      if (error.code === 'ECONNABORTED') {
        throw new BadRequestException(
          'Tiempo de espera agotado. La IA tardó demasiado en responder.',
        );
      }

      throw new BadRequestException(
        'Error al generar la rutina con la IA. Por favor, intenta de nuevo.',
      );
    }
  }

  /**
   * Generar una rutina y guardarla automáticamente
   */
  async generateAndSaveRoutine(userId: string, user: GenerateRoutineDto) {
    // Generar rutina con la IA
    const generatedRoutine = await this.generateRoutine(user);

    // Guardar la rutina en la base de datos
    const saveData = {
      nombre: `${user.goal} - ${user.level}`,
      objetivo: user.goal,
      nivel: user.level,
      week: generatedRoutine.week,
    };

    return this.rutinasService.saveGeneratedRoutine(userId, saveData);
  }
}
