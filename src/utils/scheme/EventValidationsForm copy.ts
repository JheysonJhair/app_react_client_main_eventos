export const validateForm = (formData: any) => {
  const errors: any = {};

  errors.name = formData.name ? "" : "Este campo es obligatorio";
  errors.date = formData.date ? "" : "Este campo es obligatorio";
  errors.startTime = formData.startTime ? "" : "Este campo es obligatorio";
  errors.endTime = formData.endTime ? "" : "Este campo es obligatorio";
  errors.location = formData.location ? "" : "Este campo es obligatorio";
  errors.isPrivate = formData.hasOwnProperty("isPrivate")
    ? ""
    : "Este campo es obligatorio";
  errors.description = formData.description ? "" : "Este campo es obligatorio";

  return errors;
};
