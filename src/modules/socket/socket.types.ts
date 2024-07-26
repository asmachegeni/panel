export interface ISocket {
  socket_number: number | string;
  class_of_service: string;
  ring_time: number | string;
}
export const validate = (values: ISocket) => {
  const errors: Partial<Record<keyof ISocket, string>> = {};

  if (isNaN(Number(values.ring_time))) {
    errors.ring_time = "ring_time  باید عدد باشد ";
  }

  if (isNaN(Number(values.socket_number))) {
    errors.socket_number = "socket_number  باید عدد باشد ";
  }

  return errors;
};
