import { User } from "../types/Usuario";

const API_URL = "https://bkzonafit.jhedgost.com/api/client/";

interface ApiResponseAll {
  msg: string;
  success: boolean;
  data: User[];
}

//---------------------------------------------------------------- GET TEACHER
export async function obtenerTeacher(): Promise<User[]> {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Error al obtener los datos");
    }
    const responseData: ApiResponseAll = await response.json();
    if (!responseData.success) {
      throw new Error(responseData.msg);
    }
    return responseData.data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

//---------------------------------------------------------------- POST TEACHER
export async function crearTeacher(
  teacher: Partial<User>
): Promise<{ msg: string; success: boolean }> {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(teacher),
    });
    if (!response.ok) {
      throw new Error("Error al crear el teacher");
    }
    const responseData: { msg: string; success: boolean } =
      await response.json();
    return responseData;
  } catch (error) {
    throw new Error("Error al crear el teacher: " + error);
  }
}

//---------------------------------------------------------------- UPDATE TEACHER
export async function actualizarTeacher(
  teacherId: number,
  teacher: Partial<User>
): Promise<{ msg: string; success: boolean }> {
  try {
    const url = `${API_URL}${teacherId}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(teacher),
    });
    if (!response.ok) {
      throw new Error("Error al actualizar el teacher");
    }
    const responseData: { msg: string; success: boolean } =
      await response.json();
    return responseData;
  } catch (error) {
    throw new Error("Error al actualizar el teacher: " + error);
  }
}

//---------------------------------------------------------------- DELETE TEACHER
export async function eliminarTeacher(
  teacherId: number
): Promise<{ msg: string; success: boolean }> {
  try {
    const url = `${API_URL}${teacherId}`;
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error al eliminar elteacher");
    }
    const responseData: { msg: string; success: boolean } =
      await response.json();
    return responseData;
  } catch (error) {
    throw new Error("Error al eliminar elteacher: " + error);
  }
}
