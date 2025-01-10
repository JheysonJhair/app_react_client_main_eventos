import { Event } from "../types/Events";
import { Invitado, Participant } from "../types/Participant";
import { ApiResponse } from "../types/Response/Response";

//---------------------------------------------------------------- GET ALL
export const getAllEvents = async (): Promise<Event[]> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/event/GetAll`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al obtener los eventos");
    }

    const data: ApiResponse<Event[]> = await response.json();
    if (!data.success) {
      throw new Error(data.message);
    }

    return data.data;
  } catch (error) {
    throw error;
  }
};

//---------------------------------------------------------------- GET BY ID
export const getEventById = async (id: number): Promise<Event | null> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/event/getByid/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al obtener el evento");
    }

    const data: ApiResponse<Event> = await response.json();
    if (!data.success) {
      throw new Error(data.message);
    }

    return data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

//---------------------------------------------------------------- GET PARTICIPANT BY ID
export const getPartipantEventById = async (
  id: number
): Promise<Participant[]> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/Event/GetParticipants/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al obtener los eventos");
    }

    const data: ApiResponse<Participant[]> = await response.json();
    if (!data.success) {
      throw new Error(data.message);
    }

    return data.data;
  } catch (error) {
    throw error;
  }
};

//---------------------------------------------------------------- GET PARTICIPANT BY DNI
export const searchParticipantByDni = async (
  dni: string
): Promise<Participant | null> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/Teacher/ParticipantGetByDni/${dni}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al buscar el participante por DNI.");
    }

    const data: ApiResponse<Participant> = await response.json();
    if (!data.success || !data.data) {
      throw new Error("Participante no encontrado.");
    }

    return data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

//---------------------------------------------------------------- CREATE EVENT
export const createEvent = async (eventData: {
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  isPrivate: boolean;
  description: string;
  eventTypeId: number;
}): Promise<ApiResponse<null>> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/Event`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      throw new Error("Error al crear el evento");
    }

    const data: ApiResponse<null> = await response.json();
    if (!data.success) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    console.error("Error en createEvent:", error);
    throw error;
  }
};

//---------------------------------------------------------------- ADD PARTICIPANT TO EVENT
export const addParticipantToEvent = async (
  eventId: number,
  role: number,
  idParticipant: number
): Promise<ApiResponse<null>> => {
  try {
    const payload = {
      eventId,
      role,
      idParticipant,
    };

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/Attendance/AddParticipant`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error("Error al agregar al participante al evento.");
    }

    const data: ApiResponse<null> = await response.json();
    return data;
  } catch (error) {
    console.error("Error en addParticipantToEvent:", error);
    throw error;
  }
};










//---------------------------------------------------------------- ADD INVITED TO EVENT
export const addInvitedToEvent = async (
  participant: Invitado
): Promise<ApiResponse<null>> => {
  try {
    const payload = {
      firstName: participant.firstName,
      lastName: participant.lastName,
      mail: participant.mail,
      dni: participant.dni,
    };

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/Event/CreateGuest`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data: ApiResponse<null> = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

//---------------------------------------------------------------- GET ALL INVITED
export const getAllGuest = async (): Promise<Invitado[]> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/Guest/GetAll`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al obtener los invitados");
    }

    const data: ApiResponse<Invitado[]> = await response.json();
    if (!data.success) {
      throw new Error(data.message);
    }

    return data.data;
  } catch (error) {
    throw error;
  }
};

