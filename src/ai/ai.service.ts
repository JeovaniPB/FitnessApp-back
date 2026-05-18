import { Injectable } from '@nestjs/common';
import axios from 'axios';

import { GenerateRoutineDto } from './dto/generate-routine.dto';
import { RoutineResponseDto } from './dto/routine-response.dto';

@Injectable()
export class AiService {
  async generateRoutine(
    user: GenerateRoutineDto,
  ): Promise<RoutineResponseDto> {
    const prompt = `
Eres un entrenador personal altamente personalizado.

Debes adaptar completamente la rutina según:

- edad
- peso
- objetivo
- nivel
- equipo disponible

Datos del usuario:
${JSON.stringify(user)}

REGLAS IMPORTANTES:
- Responde SOLO con JSON válido
- NO uses markdown
- NO escribas explicaciones
- 5 días de entrenamiento
- Si el objetivo es "perder grasa" → más cardio + déficit alto volumen
- Si es "ganar músculo" → más fuerza + progresión
- Si es "resistencia" → circuitos largos

Cada día debe incluir:
- day
- focus
- exercises

Cada ejercicio debe incluir:
- name
- sets
- reps

Formato esperado:
{
  "week": [
    {
      "day": "Lunes",
      "focus": "Cardio",
      "exercises": [
        {
          "name": "Jumping Jacks",
          "sets": "3",
          "reps": "20"
        }
      ]
    }
  ]
}
`;

    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content:
              'Eres un entrenador personal experto y respondes SOLO con JSON válido.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );

    try {
      const content =
        response.data.choices[0].message.content;

      return JSON.parse(content);
    } catch (error) {
      throw new Error(
        'La IA devolvió un JSON inválido',
      );
    }
  }
}
