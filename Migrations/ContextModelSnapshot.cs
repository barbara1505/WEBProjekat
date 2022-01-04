﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Models;

namespace WEBProjekat.Migrations
{
    [DbContext(typeof(Context))]
    partial class ContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.1");

            modelBuilder.Entity("Models.Autor", b =>
                {
                    b.Property<int>("Id_autora")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int?>("GodinaRodjenja")
                        .HasColumnType("int");

                    b.Property<int?>("GodinaSmrti")
                        .HasColumnType("int");

                    b.Property<string>("Ime")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<string>("Prezime")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.HasKey("Id_autora");

                    b.ToTable("Autori");
                });

            modelBuilder.Entity("Models.Bibliotekar", b =>
                {
                    b.Property<int>("Id_Bibliotekar")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("BrojKnjizice")
                        .HasColumnType("int");

                    b.Property<string>("Ime")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<string>("Pol")
                        .IsRequired()
                        .HasColumnType("nvarchar(1)");

                    b.Property<string>("Prezime")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<int>("Smena")
                        .HasColumnType("int");

                    b.HasKey("Id_Bibliotekar");

                    b.ToTable("Bibliotekari");
                });

            modelBuilder.Entity("Models.Clan", b =>
                {
                    b.Property<int>("Id_Clan")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Adresa")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ClanskaKartaIdKarte")
                        .HasColumnType("int");

                    b.Property<string>("Ime")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<string>("Prezime")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<string>("Telefon")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id_Clan");

                    b.HasIndex("ClanskaKartaIdKarte");

                    b.ToTable("Clanovi");
                });

            modelBuilder.Entity("Models.ClanskaKarta", b =>
                {
                    b.Property<int>("IdKarte")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("Clanarina")
                        .HasColumnType("int");

                    b.Property<DateTime>("DatumIzdavanja")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DatumVazenja")
                        .HasColumnType("datetime2");

                    b.Property<int>("Tip")
                        .HasMaxLength(50)
                        .HasColumnType("int");

                    b.Property<int>("brojKarte")
                        .HasColumnType("int");

                    b.HasKey("IdKarte");

                    b.ToTable("Clanske karte");
                });

            modelBuilder.Entity("Models.Iznajmljivanje", b =>
                {
                    b.Property<int>("Id_iznajmljivanje")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int?>("BibliotekarId_Bibliotekar")
                        .HasColumnType("int");

                    b.Property<int?>("ClanId_Clan")
                        .HasColumnType("int");

                    b.Property<DateTime>("DatumIznajmljivanja")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DatumVracanja")
                        .HasColumnType("datetime2");

                    b.Property<int?>("KnjigaIdKnjige")
                        .HasColumnType("int");

                    b.HasKey("Id_iznajmljivanje");

                    b.HasIndex("BibliotekarId_Bibliotekar");

                    b.HasIndex("ClanId_Clan");

                    b.HasIndex("KnjigaIdKnjige");

                    b.ToTable("Iznajmljivanje");
                });

            modelBuilder.Entity("Models.Knjiga", b =>
                {
                    b.Property<int>("IdKnjige")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int?>("AutorId_autora")
                        .HasColumnType("int");

                    b.Property<int>("BrojPrimeraka")
                        .HasColumnType("int");

                    b.Property<int>("BrojStrana")
                        .HasColumnType("int");

                    b.Property<string>("Naslov")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<int>("Zanr")
                        .HasColumnType("int");

                    b.HasKey("IdKnjige");

                    b.HasIndex("AutorId_autora");

                    b.ToTable("Knjige");
                });

            modelBuilder.Entity("Models.Clan", b =>
                {
                    b.HasOne("Models.ClanskaKarta", "ClanskaKarta")
                        .WithMany()
                        .HasForeignKey("ClanskaKartaIdKarte");

                    b.Navigation("ClanskaKarta");
                });

            modelBuilder.Entity("Models.Iznajmljivanje", b =>
                {
                    b.HasOne("Models.Bibliotekar", "Bibliotekar")
                        .WithMany("IzdateKnjige")
                        .HasForeignKey("BibliotekarId_Bibliotekar");

                    b.HasOne("Models.Clan", "Clan")
                        .WithMany("UzeteKnjige")
                        .HasForeignKey("ClanId_Clan");

                    b.HasOne("Models.Knjiga", "Knjiga")
                        .WithMany("Izdate")
                        .HasForeignKey("KnjigaIdKnjige");

                    b.Navigation("Bibliotekar");

                    b.Navigation("Clan");

                    b.Navigation("Knjiga");
                });

            modelBuilder.Entity("Models.Knjiga", b =>
                {
                    b.HasOne("Models.Autor", "Autor")
                        .WithMany("NapisaneKnjige")
                        .HasForeignKey("AutorId_autora");

                    b.Navigation("Autor");
                });

            modelBuilder.Entity("Models.Autor", b =>
                {
                    b.Navigation("NapisaneKnjige");
                });

            modelBuilder.Entity("Models.Bibliotekar", b =>
                {
                    b.Navigation("IzdateKnjige");
                });

            modelBuilder.Entity("Models.Clan", b =>
                {
                    b.Navigation("UzeteKnjige");
                });

            modelBuilder.Entity("Models.Knjiga", b =>
                {
                    b.Navigation("Izdate");
                });
#pragma warning restore 612, 618
        }
    }
}
