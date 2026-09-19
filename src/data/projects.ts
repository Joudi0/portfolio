import { ProjectDetails } from '../types';

export const PROJECTS_DATA: Record<string, ProjectDetails> = {
  facilityflux: {
    title: "FacilityFlux: Multi-Tenant Residential & Facility SaaS",
    subtitle: "Full-Stack & SaaS Architect · C# / .NET 10 / PostgreSQL",
    role: "Full-Stack & SaaS Architect",
    architecture:
      "FacilityFlux is a multi-tenant B2B SaaS for residential towers to manage access, amenities, and resident/employee operations.",
    codeSnippet: `// Multi-tenant RLS via JWT TenantID claims
public async Task<IEnumerable<AmenityBookingDto>> GetBookingsAsync()
{
    var tenantId = _tenantContext.TenantId
        ?? throw new UnauthorizedAccessException("Missing TenantID claim.");

    // PostgreSQL RLS policies enforce tenant isolation at the DB layer
    return await _db.AmenityBookings
        .AsNoTracking()
        .Where(b => b.TenantId == tenantId)
        .OrderByDescending(b => b.StartsAt)
        .Select(b => b.ToDto())
        .ToListAsync();
}`,
    highlights: [
      "Multi-tenant Row-Level Security (RLS) via JWT TenantID claims",
      "High-performance .NET 10 Web API + native PostgreSQL (PL/pgSQL)",
      "Zero-trust ownership rules, rate limiting, and audit logging",
      "Built and deployed end-to-end in under 48 hours using ReshkoEngine"
    ],
    skills: ["C#", ".NET Core", "PostgreSQL", "RESTful API", "SaaS Development"],
    published: "Sep 16, 2026",
    moreBy: [
      { id: "dvld", title: "DVLD: Enterprise Full-Stack Web Platform (.NET 10 & React)" },
      { id: "reshko", title: "ReshkoEngine v1.0.0 — Autonomous .NET 10 Architecture & Code Compiler" },
      { id: "dvld-desktop", title: "Full DVLD Desktop" }
    ],
    securityNote:
      "Zero-trust ownership rules, JWT TenantID claims, rate limiting, and audit logging protect multi-tenant residential operations.",
    liveUrl: "https://facilityflux.joudi.dev",
    liveUrlLabel: "Live Demo ↗"
  },
  dvld: {
    title: "DVLD: Enterprise Full-Stack Web Platform (.NET 10 & React)",
    subtitle: "Full-Stack Architect & .NET Engineer · React / ASP.NET Core / MS SQL Server",
    role: "Full-Stack Architect & .NET Engineer",
    architecture:
      "Production-grade licensing platform (Live demo: dvld.joudi.dev). Frontend: React, TypeScript & Tailwind CSS with dynamic data grids and server-side filtering. Backend: ASP.NET Core (.NET 10) 4-Tier Clean Architecture scaffolded via ReshkoEngine. Database: MS SQL Server with 121+ parameterized Stored Procedures & ADO.NET; batch-loading to eliminate N+1 queries.",
    codeSnippet: `// ASP.NET Core Rate Limiter & IDOR Mitigation Endpoint Policy
[Authorize]
[HttpGet("drivers/{driverId}/licenses")]
[ProducesResponseType(typeof(IEnumerable<DriverLicenseDto>), StatusCodes.Status200OK)]
[ProducesResponseType(StatusCodes.Status403Forbidden)]
public async Task<IActionResult> GetDriverLicenses(int driverId, [FromHeader(Name = "X-Trace-Id")] string traceId)
{
    // IDOR Protection: Verify authenticated User Context matches requested DriverId
    var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
    if (!await _driverService.IsUserAuthorizedForDriverAsync(currentUserId, driverId))
    {
        _logger.LogWarning("Potential IDOR attempt detected. TraceId: {TraceId}, User: {UserId}, TargetDriver: {Target}", 
            traceId, currentUserId, driverId);
        return Forbid();
    }

    var licenses = await _driverService.GetLicensesByDriverIdAsync(driverId);
    return Ok(licenses);
}`,
    highlights: [
      "Frontend: React, TypeScript & Tailwind CSS with dynamic data grids and server-side filtering",
      "Backend: ASP.NET Core (.NET 10) 4-Tier Clean Architecture scaffolded via ReshkoEngine",
      "Database: MS SQL Server with 121+ parameterized Stored Procedures & ADO.NET; batch-loading to eliminate N+1 queries",
      "Security & Telemetry: RBAC, dual-token JWT auth, IDOR mitigations, and automated in-database error logging"
    ],
    skills: ["Full-Stack Development", "ASP.NET", "React", "Microsoft SQL Server", "C#"],
    published: "Aug 29, 2026",
    moreBy: [
      { id: "facilityflux", title: "FacilityFlux" },
      { id: "reshko", title: "ReshkoEngine v1.0.0" },
      { id: "dvld-desktop", title: "Full DVLD Desktop" }
    ],
    securityNote:
      "RBAC, dual-token JWT auth, IDOR mitigations, and automated in-database error logging harden the licensing platform.",
    liveUrl: "https://dvld.joudi.dev",
    liveUrlLabel: "Live Demo ↗",
    repoUrl: "https://github.com/Joudi0/DVLD-Full-Backend",
    repoUrlLabel: "Backend GitHub Repo ↗",
    upworkUrl: "https://www.upwork.com/freelancers/~0110990d2c3ed41795?p=2075387221929848832"
  },
  reshko: {
    title: "ReshkoEngine v1.0.0 — Autonomous .NET 10 Architecture & Code Compiler",
    subtitle: "Lead Software Architect & Inventor · C# 13 / .NET 10 · 12,000+ Lines",
    role: "Lead Software Architect & Inventor",
    architecture:
      "ReshkoEngine is a proprietary 12,000+ line C# compilation engine that transforms DB schemas into production-ready ASP.NET Core Clean Architecture backends in seconds. Emits C# WebAPI, TS clients, and Docker CI/CD pipelines.",
    codeSnippet: `// ReshkoEngine Multi-Database Generator Factory Pattern (Strategy Pattern Dispatcher)
public class DatabaseGeneratorFactory
{
    public static IDatabaseGenerator CreateGenerator(DatabaseType dbType, string connectionString)
    {
        return dbType switch
        {
            DatabaseType.SqlServer => new MssqlDatabaseGenerator(connectionString),
            DatabaseType.MySql     => new MysqlDatabaseGenerator(connectionString),
            DatabaseType.Postgres  => new PostgresDatabaseGenerator(connectionString),
            _ => throw new NotSupportedException($"Database provider '{dbType}' is not supported by ReshkoEngine.")
        };
    }
}

// 20+ Modular Classes in Architecture:
// Program.cs, HelperFuncs, AuthInfrastructureGeneratorHelper, DatabaseMetadataHelper,
// NamingHelper, SolutionGeneratorHelper, TypeMapperHelper, DatabaseGeneratorFactory,
// IDatabaseGenerator, MssqlDatabaseGenerator, MysqlDatabaseGenerator, PostgresDatabaseGenerator,
// SharedVars, clsBLL, ControllerGenerator, DtoGenerator, GenerationMemory,
// GenerationMemoryHelper, InputRecorder, clsPresentation`,
    highlights: [
      "Zero-hallucination code generation with multi-tenant RLS",
      "Native DB compilation: SQL Server (T-SQL), PostgreSQL (PL/pgSQL), Oracle, MySQL & EF Core",
      "Built-in security: CWE-208 timing attack defense, anti-tampering DTOs & token rotation",
      "Emits C# WebAPI, TS clients, and Docker CI/CD pipelines"
    ],
    skills: ["C#", ".NET Core", "PostgreSQL", "MySQL", "Microsoft SQL Server"],
    published: "Jul 12, 2026",
    moreBy: [
      { id: "facilityflux", title: "FacilityFlux" },
      { id: "dvld", title: "DVLD" },
      { id: "dvld-desktop", title: "Full DVLD Desktop" }
    ],
    dbSupport: [
      "🟢 MS SQL Server (SqlConnection, T-SQL Stored Procs, SCOPE_IDENTITY())",
      "🟡 MySQL (MySqlConnection, MySQL Stored Procs, LAST_INSERT_ID())",
      "🔵 PostgreSQL (NpgsqlConnection, PL/pgSQL Functions, RETURNING)",
      "🟠 Oracle & EF Core compilation targets"
    ],
    designPatterns: [
      "🎯 Strategy Pattern: Dynamic multi-database query provider execution (IDatabaseGenerator)",
      "🏭 Factory Pattern: DatabaseGeneratorFactory creating concrete DB providers dynamically",
      "🏛️ Facade Pattern: Unified, simplified orchestration interface for full solution scaffolding"
    ],
    classArchitecture: [
      "Program.cs (Spectre.Console CLI Entry Point)",
      "DatabaseGeneratorFactory & IDatabaseGenerator (Factory/Strategy Interfaces)",
      "MssqlDatabaseGenerator, MysqlDatabaseGenerator, PostgresDatabaseGenerator (DB Implementations)",
      "AuthInfrastructureGeneratorHelper & DatabaseMetadataHelper (Security & DB Schema Engine)",
      "SolutionGeneratorHelper, NamingHelper, TypeMapperHelper (.slnx Solution Builders)",
      "ControllerGenerator, DtoGenerator, clsBLL, clsPresentation (N-Tier Code Synthesis)",
      "GenerationMemory, GenerationMemoryHelper, InputRecorder (Replay Memory & State Tracker)",
      "SharedVars & HelperFuncs (Shared Core Engine Utilities)"
    ],
    solutionStructure: `MySolution/
├── MySolution.slnx                   # Modern .NET 10 Solution File
│
├── 📦 DAL (Data Access Layer)          # Connection strings, ADO.NET async DB operations
├── 📦 BLL (Business Logic Layer)       # Business logic, DTO mappings, hashing & FK composition
├── 📦 Shared (Core Contracts & DTOs)   # Brief/Full DTOs, TenantContext, PBKDF2 Helper, enRoles
└── 🌐 WebAPI (Presentation Layer)      # Controllers, JWT TokenService, TenantMiddleware, Policies`,
    securityNote:
      "Mitigates SQL Injection via Parameterized Stored Procedures and Zero-Trust input typing. Built-in CWE-208 timing attack defense, anti-tampering DTOs & token rotation. Created and owned exclusively by Joudi Adeeb. Private, Proprietary, and Confidential IP.",
    isPrivate: true,
    upworkUrl: "https://www.upwork.com/freelancers/~0110990d2c3ed41795?p=2076384185198800896"
  },
  "dvld-desktop": {
    title: "Full DVLD Desktop",
    subtitle: ".NET Framework Developer full stack · WinForms / MS SQL Server",
    role: ".NET Framework Developer full stack",
    architecture:
      "Full DVLD Desktop Application with mssql database more than 15 table, .NET Framework.",
    codeSnippet: `// WinForms desktop layered over MS SQL Server (15+ tables)
public async Task<DataTable> LoadApplicationsAsync(string searchTerm, int page, int pageSize)
{
    using var connection = new SqlConnection(_connectionString);
    using var command = new SqlCommand("SP_Applications_GetPaged", connection)
    {
        CommandType = CommandType.StoredProcedure
    };

    command.Parameters.AddWithValue("@SearchTerm", searchTerm ?? (object)DBNull.Value);
    command.Parameters.AddWithValue("@Page", page);
    command.Parameters.AddWithValue("@PageSize", pageSize);

    var table = new DataTable();
    await connection.OpenAsync();
    using var reader = await command.ExecuteReaderAsync();
    table.Load(reader);
    return table;
}`,
    highlights: [
      "Full DVLD Desktop Application built with .NET Framework",
      "MS SQL Server database with more than 15 tables",
      "Desktop companion for licensing workflows and data entry"
    ],
    skills: [".NET Framework", "C#", "Microsoft SQL Server", "Database Design"],
    published: "Jul 10, 2026",
    moreBy: [
      { id: "facilityflux", title: "FacilityFlux" },
      { id: "dvld", title: "DVLD" },
      { id: "reshko", title: "ReshkoEngine v1.0.0" }
    ],
    securityNote:
      "Parameterized stored procedures and layered WinForms access patterns protect licensing data on the desktop client.",
    repoUrl: "https://github.com/Joudi0/DVLD-Project",
    repoUrlLabel: "GitHub Repo ↗",
    upworkUrl: "https://www.upwork.com/freelancers/~0110990d2c3ed41795?p=2075388666670444544"
  },
  crm: {
    title: "Enterprise Multi-Tenant CRM Schema Design",
    subtitle: "Relational Database Design & Advanced Row-Level Security",
    architecture: "25+ Tables Relational Schema with Row-Level Tenant Isolation",
    codeSnippet: `-- Row-Level Isolation Token Implementation via SQL Views & Triggers
CREATE VIEW dbo.vw_TenantTransactions AS
SELECT 
    TransactionID,
    CompanyID,
    CustomerName,
    Amount,
    CreatedAt
FROM dbo.Transactions WITH (NOLOCK)
WHERE CompanyID = CAST(SESSION_CONTEXT(N'CurrentCompanyID') AS INT);

-- Enforce Global CompanyID Tracking Token on Insert
CREATE TRIGGER trg_EnforceTenantIsolation
ON dbo.Transactions
FOR INSERT AS
BEGIN
    SET NOCOUNT ON;
    IF EXISTS (
        SELECT 1 FROM inserted 
        WHERE CompanyID <> CAST(SESSION_CONTEXT(N'CurrentCompanyID') AS INT)
    )
    BEGIN
        RAISERROR ('Tenant Access Violation: Invalid CompanyID Token.', 16, 1);
        ROLLBACK TRANSACTION;
    END
END;`,
    highlights: [
      "Architected a 25+ tables enterprise schema with strict tenant boundaries.",
      "Guaranteed absolute multi-tenant data separation via global CompanyID tracking tokens.",
      "Zero-latency overhead using SQL Server SESSION_CONTEXT and indexed tenant partitioning."
    ],
    securityNote: "Prevents cross-tenant data leaks at the physical database tier. Source schema provided as conceptual architecture."
  }
};
