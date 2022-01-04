using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WEBProjekat.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Autori",
                columns: table => new
                {
                    Id_autora = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    GodinaRodjenja = table.Column<int>(type: "int", nullable: true),
                    GodinaSmrti = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Autori", x => x.Id_autora);
                });

            migrationBuilder.CreateTable(
                name: "Bibliotekari",
                columns: table => new
                {
                    Id_Bibliotekar = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BrojKnjizice = table.Column<int>(type: "int", nullable: false),
                    Ime = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Pol = table.Column<string>(type: "nvarchar(1)", nullable: false),
                    Smena = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bibliotekari", x => x.Id_Bibliotekar);
                });

            migrationBuilder.CreateTable(
                name: "Clanske karte",
                columns: table => new
                {
                    IdKarte = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    brojKarte = table.Column<int>(type: "int", nullable: false),
                    Tip = table.Column<int>(type: "int", maxLength: 50, nullable: false),
                    DatumIzdavanja = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DatumVazenja = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Clanarina = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clanske karte", x => x.IdKarte);
                });

            migrationBuilder.CreateTable(
                name: "Knjige",
                columns: table => new
                {
                    IdKnjige = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naslov = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    BrojPrimeraka = table.Column<int>(type: "int", nullable: false),
                    BrojStrana = table.Column<int>(type: "int", nullable: false),
                    Zanr = table.Column<int>(type: "int", nullable: false),
                    AutorId_autora = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Knjige", x => x.IdKnjige);
                    table.ForeignKey(
                        name: "FK_Knjige_Autori_AutorId_autora",
                        column: x => x.AutorId_autora,
                        principalTable: "Autori",
                        principalColumn: "Id_autora",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Clanovi",
                columns: table => new
                {
                    Id_Clan = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Adresa = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Telefon = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ClanskaKartaIdKarte = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clanovi", x => x.Id_Clan);
                    table.ForeignKey(
                        name: "FK_Clanovi_Clanske karte_ClanskaKartaIdKarte",
                        column: x => x.ClanskaKartaIdKarte,
                        principalTable: "Clanske karte",
                        principalColumn: "IdKarte",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Iznajmljivanje",
                columns: table => new
                {
                    Id_iznajmljivanje = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DatumIznajmljivanja = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DatumVracanja = table.Column<DateTime>(type: "datetime2", nullable: true),
                    BibliotekarId_Bibliotekar = table.Column<int>(type: "int", nullable: true),
                    ClanId_Clan = table.Column<int>(type: "int", nullable: true),
                    KnjigaIdKnjige = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Iznajmljivanje", x => x.Id_iznajmljivanje);
                    table.ForeignKey(
                        name: "FK_Iznajmljivanje_Bibliotekari_BibliotekarId_Bibliotekar",
                        column: x => x.BibliotekarId_Bibliotekar,
                        principalTable: "Bibliotekari",
                        principalColumn: "Id_Bibliotekar",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Iznajmljivanje_Clanovi_ClanId_Clan",
                        column: x => x.ClanId_Clan,
                        principalTable: "Clanovi",
                        principalColumn: "Id_Clan",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Iznajmljivanje_Knjige_KnjigaIdKnjige",
                        column: x => x.KnjigaIdKnjige,
                        principalTable: "Knjige",
                        principalColumn: "IdKnjige",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Clanovi_ClanskaKartaIdKarte",
                table: "Clanovi",
                column: "ClanskaKartaIdKarte");

            migrationBuilder.CreateIndex(
                name: "IX_Iznajmljivanje_BibliotekarId_Bibliotekar",
                table: "Iznajmljivanje",
                column: "BibliotekarId_Bibliotekar");

            migrationBuilder.CreateIndex(
                name: "IX_Iznajmljivanje_ClanId_Clan",
                table: "Iznajmljivanje",
                column: "ClanId_Clan");

            migrationBuilder.CreateIndex(
                name: "IX_Iznajmljivanje_KnjigaIdKnjige",
                table: "Iznajmljivanje",
                column: "KnjigaIdKnjige");

            migrationBuilder.CreateIndex(
                name: "IX_Knjige_AutorId_autora",
                table: "Knjige",
                column: "AutorId_autora");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Iznajmljivanje");

            migrationBuilder.DropTable(
                name: "Bibliotekari");

            migrationBuilder.DropTable(
                name: "Clanovi");

            migrationBuilder.DropTable(
                name: "Knjige");

            migrationBuilder.DropTable(
                name: "Clanske karte");

            migrationBuilder.DropTable(
                name: "Autori");
        }
    }
}
