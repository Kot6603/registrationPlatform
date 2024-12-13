function requireAdmin(request, response, next) {
  const user = request.user;

  if (!user) {
    return response.status(401).json({
      error: "Unauthorized: Valid authorization token required",
    });
  }

  if (user.email !== process.env.ADMIN_EMAIL) {
    return response.status(403).json({
      error: "Forbidden: Need admin privileges to perform this action",
    });
  }

  next();
}

export default requireAdmin;
