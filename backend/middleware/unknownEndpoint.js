function unknownEndpoint(_, response) {
  response.status(404).send({ error: "unknown endpoint" });
}

export default unknownEndpoint;
