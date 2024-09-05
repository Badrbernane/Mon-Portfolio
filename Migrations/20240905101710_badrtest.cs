using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MonBackendApp.Migrations
{
    /// <inheritdoc />
    public partial class badrtest : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "nombre_d_experience",
                table: "Personnes");

            migrationBuilder.RenameColumn(
                name: "date_projet",
                table: "Projets",
                newName: "dateprojet");

            migrationBuilder.RenameColumn(
                name: "date_modification",
                table: "Projets",
                newName: "datemodification");

            migrationBuilder.RenameColumn(
                name: "date_creation",
                table: "Projets",
                newName: "datecreation");

            migrationBuilder.RenameColumn(
                name: "titre_poste",
                table: "Personnes",
                newName: "titreposte");

            migrationBuilder.RenameColumn(
                name: "mot_de_passe",
                table: "Personnes",
                newName: "numTelephone");

            migrationBuilder.RenameColumn(
                name: "lien_twitter",
                table: "Personnes",
                newName: "motdepasse");

            migrationBuilder.RenameColumn(
                name: "lien_linkdin",
                table: "Personnes",
                newName: "lientwitter");

            migrationBuilder.RenameColumn(
                name: "lien_instagram",
                table: "Personnes",
                newName: "lienlinkdin");

            migrationBuilder.RenameColumn(
                name: "lien_facebook",
                table: "Personnes",
                newName: "lieninstagram");

            migrationBuilder.RenameColumn(
                name: "date_modification",
                table: "Personnes",
                newName: "datemodification");

            migrationBuilder.RenameColumn(
                name: "date_creation",
                table: "Personnes",
                newName: "datecreation");

            migrationBuilder.RenameColumn(
                name: "code_postal",
                table: "Personnes",
                newName: "lienfacebook");

            migrationBuilder.RenameColumn(
                name: "date_fin",
                table: "Formations",
                newName: "datefin");

            migrationBuilder.RenameColumn(
                name: "date_début",
                table: "Formations",
                newName: "datedebut");

            migrationBuilder.RenameColumn(
                name: "date_modification",
                table: "Experiences",
                newName: "datemodification");

            migrationBuilder.RenameColumn(
                name: "date_fin",
                table: "Experiences",
                newName: "datefin");

            migrationBuilder.RenameColumn(
                name: "date_début",
                table: "Experiences",
                newName: "datedebut");

            migrationBuilder.RenameColumn(
                name: "date_creation",
                table: "Experiences",
                newName: "datecreation");

            migrationBuilder.RenameColumn(
                name: "date_modification",
                table: "Compétences",
                newName: "datemodification");

            migrationBuilder.RenameColumn(
                name: "date_creation",
                table: "Compétences",
                newName: "datecreation");

            migrationBuilder.RenameColumn(
                name: "date_modification",
                table: "Certificats",
                newName: "datemodification");

            migrationBuilder.RenameColumn(
                name: "date_creation",
                table: "Certificats",
                newName: "datecreation");

            migrationBuilder.RenameColumn(
                name: "date_modification",
                table: "CentreIntérets",
                newName: "datemodification");

            migrationBuilder.RenameColumn(
                name: "date_creation",
                table: "CentreIntérets",
                newName: "datecreation");

            migrationBuilder.AlterColumn<string>(
                name: "niveau",
                table: "PerssLangs",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "age",
                table: "Personnes",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "codepostal",
                table: "Personnes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "nombredexperience",
                table: "Personnes",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ChangePasswordRequests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    OldPassword = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NewPassword = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ConfirmNewPassword = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                });

            migrationBuilder.CreateTable(
                name: "LoginRequests",
                columns: table => new
                {
                    gmail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    motdepasse = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                });

            migrationBuilder.CreateTable(
                name: "PerssCents",
                columns: table => new
                {
                    idPersonnes = table.Column<int>(type: "int", nullable: false),
                    idCentreIntérets = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PerssCents", x => new { x.idPersonnes, x.idCentreIntérets });
                    table.ForeignKey(
                        name: "FK_PerssCents_CentreIntérets_idCentreIntérets",
                        column: x => x.idCentreIntérets,
                        principalTable: "CentreIntérets",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PerssCents_Personnes_idPersonnes",
                        column: x => x.idPersonnes,
                        principalTable: "Personnes",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PerssComps",
                columns: table => new
                {
                    idPersonnes = table.Column<int>(type: "int", nullable: false),
                    idCompétences = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PerssComps", x => new { x.idPersonnes, x.idCompétences });
                    table.ForeignKey(
                        name: "FK_PerssComps_Compétences_idCompétences",
                        column: x => x.idCompétences,
                        principalTable: "Compétences",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PerssComps_Personnes_idPersonnes",
                        column: x => x.idPersonnes,
                        principalTable: "Personnes",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "registerRequests",
                columns: table => new
                {
                    gmail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    motdepasse = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    nom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    prenom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    numTelephone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    motdepasseconfirmation = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                });

            migrationBuilder.CreateIndex(
                name: "IX_PerssCents_idCentreIntérets",
                table: "PerssCents",
                column: "idCentreIntérets");

            migrationBuilder.CreateIndex(
                name: "IX_PerssComps_idCompétences",
                table: "PerssComps",
                column: "idCompétences");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChangePasswordRequests");

            migrationBuilder.DropTable(
                name: "LoginRequests");

            migrationBuilder.DropTable(
                name: "PerssCents");

            migrationBuilder.DropTable(
                name: "PerssComps");

            migrationBuilder.DropTable(
                name: "registerRequests");

            migrationBuilder.DropColumn(
                name: "codepostal",
                table: "Personnes");

            migrationBuilder.DropColumn(
                name: "nombredexperience",
                table: "Personnes");

            migrationBuilder.RenameColumn(
                name: "dateprojet",
                table: "Projets",
                newName: "date_projet");

            migrationBuilder.RenameColumn(
                name: "datemodification",
                table: "Projets",
                newName: "date_modification");

            migrationBuilder.RenameColumn(
                name: "datecreation",
                table: "Projets",
                newName: "date_creation");

            migrationBuilder.RenameColumn(
                name: "titreposte",
                table: "Personnes",
                newName: "titre_poste");

            migrationBuilder.RenameColumn(
                name: "numTelephone",
                table: "Personnes",
                newName: "mot_de_passe");

            migrationBuilder.RenameColumn(
                name: "motdepasse",
                table: "Personnes",
                newName: "lien_twitter");

            migrationBuilder.RenameColumn(
                name: "lientwitter",
                table: "Personnes",
                newName: "lien_linkdin");

            migrationBuilder.RenameColumn(
                name: "lienlinkdin",
                table: "Personnes",
                newName: "lien_instagram");

            migrationBuilder.RenameColumn(
                name: "lieninstagram",
                table: "Personnes",
                newName: "lien_facebook");

            migrationBuilder.RenameColumn(
                name: "lienfacebook",
                table: "Personnes",
                newName: "code_postal");

            migrationBuilder.RenameColumn(
                name: "datemodification",
                table: "Personnes",
                newName: "date_modification");

            migrationBuilder.RenameColumn(
                name: "datecreation",
                table: "Personnes",
                newName: "date_creation");

            migrationBuilder.RenameColumn(
                name: "datefin",
                table: "Formations",
                newName: "date_fin");

            migrationBuilder.RenameColumn(
                name: "datedebut",
                table: "Formations",
                newName: "date_début");

            migrationBuilder.RenameColumn(
                name: "datemodification",
                table: "Experiences",
                newName: "date_modification");

            migrationBuilder.RenameColumn(
                name: "datefin",
                table: "Experiences",
                newName: "date_fin");

            migrationBuilder.RenameColumn(
                name: "datedebut",
                table: "Experiences",
                newName: "date_début");

            migrationBuilder.RenameColumn(
                name: "datecreation",
                table: "Experiences",
                newName: "date_creation");

            migrationBuilder.RenameColumn(
                name: "datemodification",
                table: "Compétences",
                newName: "date_modification");

            migrationBuilder.RenameColumn(
                name: "datecreation",
                table: "Compétences",
                newName: "date_creation");

            migrationBuilder.RenameColumn(
                name: "datemodification",
                table: "Certificats",
                newName: "date_modification");

            migrationBuilder.RenameColumn(
                name: "datecreation",
                table: "Certificats",
                newName: "date_creation");

            migrationBuilder.RenameColumn(
                name: "datemodification",
                table: "CentreIntérets",
                newName: "date_modification");

            migrationBuilder.RenameColumn(
                name: "datecreation",
                table: "CentreIntérets",
                newName: "date_creation");

            migrationBuilder.AlterColumn<int>(
                name: "niveau",
                table: "PerssLangs",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<int>(
                name: "age",
                table: "Personnes",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "nombre_d_experience",
                table: "Personnes",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
