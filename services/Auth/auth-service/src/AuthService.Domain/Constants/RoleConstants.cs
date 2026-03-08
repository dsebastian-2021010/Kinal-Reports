using System;

namespace AuthService.Domain.Constants;

public class RoleConstants
{
    public const string ALUMNO_ROLE = "ALUMNO_ROLE";
    public const string ADMINISTRADOR_ROLE = "ADMINISTRADOR_ROLE";
    public const string PROFESOR_ROLE = "PROFESOR_ROLE";

    public static readonly string[] AllowedRoles = [ALUMNO_ROLE, ADMINISTRADOR_ROLE, PROFESOR_ROLE];
    
}
