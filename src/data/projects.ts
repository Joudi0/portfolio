import { ProjectDetails } from '../types';

export const PROJECTS_DATA: Record<string, ProjectDetails> = {
  zagros: {
    title: "Zagros Scaffolding Tool (Enterprise .NET Architecture Engine)",
    subtitle: "C# 13 / .NET 10, SOLID Principles, 3 Design Patterns (Strategy, Factory, Facade), +6,000 Lines, 20+ Classes",
    architecture: "4-Tier Clean Architecture Solution (.NET 10 .slnx) Generator: DAL (Data Access Layer), BLL (Business Logic Layer), Shared (DTOs & Contracts), WebAPI (Controllers, JWT & Middleware)",
    codeSnippet: `// Zagros Multi-Database Generator Factory Pattern (Strategy Pattern Dispatcher)
public class DatabaseGeneratorFactory
{
    public static IDatabaseGenerator CreateGenerator(DatabaseType dbType, string connectionString)
    {
        return dbType switch
        {
            DatabaseType.SqlServer => new MssqlDatabaseGenerator(connectionString),
            DatabaseType.MySql     => new MysqlDatabaseGenerator(connectionString),
            DatabaseType.Postgres  => new PostgresDatabaseGenerator(connectionString),
            _ => throw new NotSupportedException($"Database provider '{dbType}' is not supported by Zagros Engine.")
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
      "Engineered with +6,000 lines of production-grade C# 13 / .NET 10 code modularized across 20+ dedicated classes adhering strictly to SOLID principles.",
      "Implements 3 Core Software Design Patterns: Strategy Pattern (DB provider execution), Factory Pattern (DatabaseGeneratorFactory creation), and Facade Pattern (simplified CLI generation pipeline).",
      "Multi-Database Engine: Supports Microsoft SQL Server (ADO.NET, T-SQL Stored Procedures, SCOPE_IDENTITY()), MySQL (MySqlConnection, LAST_INSERT_ID()), and PostgreSQL (NpgsqlConnection, PL/pgSQL with RETURNING).",
      "Production-Grade Security & Auth: PBKDF2 cryptographic password hashing with unique per-user salt strings via Rfc2898DeriveBytes, 15-min JWT Access Tokens + DB-hashed Refresh Tokens (UserTokens table) with revocation endpoints (/api/auth/refresh, /api/auth/logout).",
      "Dynamic Role-Based Access Control (RBAC): Automatically syncs with DB Roles table to construct strongly-typed C# enRoles enums and UserOwnerOrAdmin resource ownership authorization.",
      "Native SaaS Multi-Tenancy: Automatic tenant filtering at Stored Procedure level, AsyncLocal<int?> context propagation via TenantContext, and zero-touch TenantMiddleware.",
      "Smart DTOs & API Optimization: Dual-DTO system (Brief vs. Full), FK composition, ASP.NET Core Rate Limiting (AuthPolicy, ReadPolicy, WritePolicy), and Scalar.AspNetCore OpenAPI interactive documentation.",
      "Interactive CLI & Replay Memory: Rich Spectre.Console Terminal UI with state persistence (generation-memory.json) enabling 1-click replaying and instant updates."
    ],
    dbSupport: [
      "🟢 MS SQL Server (SqlConnection, T-SQL Stored Procs, SCOPE_IDENTITY())",
      "🟡 MySQL (MySqlConnection, MySQL Stored Procs, LAST_INSERT_ID())",
      "🔵 PostgreSQL (NpgsqlConnection, PL/pgSQL Functions, RETURNING)"
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
    securityNote: "Mitigates SQL Injection completely by using Parameterized Stored Procedures and Zero-Trust input typing. Created and owned exclusively by Joudi Adeeb. Private, Proprietary, and Confidential IP.",
    isPrivate: true,
    upworkUrl: "https://www.upwork.com/freelancers/~0110990d2c3ed41795?p=2076384185198800896"
  },
  dvld: {
    title: "DVLD (Driving Licenses Management System) - Desktop & API",
    subtitle: ".NET 10, MS SQL Server, Stored Procedures, WinForms C#, Scalar OpenDocs",
    architecture: "120+ REST Endpoints + C# WinForms Desktop Companion with Async Server-Side Data Grid Filtering",
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
      "Generated 12,443 lines of backend code embedding 121 injected Stored Procedures.",
      "Exposed 120+ secure RESTful endpoints with global IP-based rate limiting and Scalar documentation.",
      "Developed a companion C# WinForms desktop application featuring multi-tiered asynchronous server-side filtering & SQL audit triggers."
    ],
    securityNote: "Strict resource-ownership access policies prevent Broken Access Control / IDOR exploits.",
    liveUrl: "https://joudi-dvld.runasp.net/scalar/v1",
    repoUrl: "https://github.com/Joudi0/DVLD-Full-Backend",
    desktopRepoUrl: "https://github.com/Joudi0/DVLD-Project",
    upworkUrl: "https://www.upwork.com/freelancers/~0110990d2c3ed41795?p=2075387221929848832",
    desktopUpworkUrl: "https://www.upwork.com/freelancers/~0110990d2c3ed41795?p=2075388666670444544"
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
