USE [master]
GO
/****** Object:  Database [badr]    Script Date: 02/09/2024 15:52:53 ******/
CREATE DATABASE [badr]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'badr', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\badr.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'badr_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\badr_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [badr] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [badr].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [badr] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [badr] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [badr] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [badr] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [badr] SET ARITHABORT OFF 
GO
ALTER DATABASE [badr] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [badr] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [badr] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [badr] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [badr] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [badr] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [badr] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [badr] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [badr] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [badr] SET  DISABLE_BROKER 
GO
ALTER DATABASE [badr] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [badr] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [badr] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [badr] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [badr] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [badr] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [badr] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [badr] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [badr] SET  MULTI_USER 
GO
ALTER DATABASE [badr] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [badr] SET DB_CHAINING OFF 
GO
ALTER DATABASE [badr] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [badr] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [badr] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [badr] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [badr] SET QUERY_STORE = ON
GO
ALTER DATABASE [badr] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [badr]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 02/09/2024 15:52:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CentreIntérets]    Script Date: 02/09/2024 15:52:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CentreIntérets](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nom] [nvarchar](255) NOT NULL,
	[datecreation] [datetime] NOT NULL,
	[datemodification] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Certificats]    Script Date: 02/09/2024 15:52:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Certificats](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nom] [nvarchar](255) NOT NULL,
	[source] [nvarchar](255) NOT NULL,
	[image] [nvarchar](max) NULL,
	[datecreation] [datetime] NOT NULL,
	[datemodification] [datetime] NOT NULL,
	[idPersonnes] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ChangePasswordRequests]    Script Date: 02/09/2024 15:52:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChangePasswordRequests](
	[Id] [int] NOT NULL,
	[OldPassword] [nvarchar](255) NOT NULL,
	[NewPassword] [nvarchar](255) NOT NULL,
	[ConfirmNewPassword] [nvarchar](255) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Compétences]    Script Date: 02/09/2024 15:52:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Compétences](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nom] [nvarchar](255) NOT NULL,
	[datecreation] [datetime] NOT NULL,
	[datemodification] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Experiences]    Script Date: 02/09/2024 15:52:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Experiences](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[entreprise] [nvarchar](255) NOT NULL,
	[datedebut] [datetime] NOT NULL,
	[datefin] [datetime] NOT NULL,
	[remarque] [nvarchar](max) NULL,
	[datecreation] [datetime] NOT NULL,
	[datemodification] [datetime] NOT NULL,
	[idPersonnes] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Formations]    Script Date: 02/09/2024 15:52:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Formations](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[titre] [nvarchar](255) NOT NULL,
	[datedebut] [datetime] NULL,
	[ecole] [nvarchar](255) NOT NULL,
	[actuel] [bit] NOT NULL,
	[datefin] [datetime] NULL,
	[description] [nvarchar](max) NULL,
	[date_creation] [datetime] NOT NULL,
	[date_modification] [datetime] NOT NULL,
	[idPersonnes] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Langues]    Script Date: 02/09/2024 15:52:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Langues](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nom] [varchar](50) NOT NULL,
	[date_creation] [date] NOT NULL,
	[date_modification] [date] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LoginRequests]    Script Date: 02/09/2024 15:52:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LoginRequests](
	[gmail] [nvarchar](255) NULL,
	[mot_de_passe] [nvarchar](255) NULL,
UNIQUE NONCLUSTERED 
(
	[gmail] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Personne]    Script Date: 02/09/2024 15:52:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Personne](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nom] [nvarchar](max) NOT NULL,
	[prenom] [nvarchar](max) NOT NULL,
	[age] [int] NOT NULL,
	[code_postal] [nvarchar](max) NOT NULL,
	[gmail] [nvarchar](max) NOT NULL,
	[mot_de_passe] [nvarchar](max) NOT NULL,
	[permis] [nvarchar](max) NOT NULL,
	[description] [nvarchar](max) NOT NULL,
	[titre_poste] [nvarchar](max) NOT NULL,
	[photo] [nvarchar](255) NULL,
	[lien_facebook] [nvarchar](max) NOT NULL,
	[lien_linkdin] [nvarchar](max) NOT NULL,
	[lien_instagram] [nvarchar](max) NOT NULL,
	[lien_twitter] [nvarchar](max) NOT NULL,
	[cv] [nvarchar](max) NOT NULL,
	[nombre_d_experience] [int] NOT NULL,
	[date_creation] [datetime2](7) NOT NULL,
	[date_modification] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Personne] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Personnes]    Script Date: 02/09/2024 15:52:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Personnes](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nom] [varchar](50) NULL,
	[prenom] [varchar](50) NULL,
	[age] [int] NULL,
	[gmail] [varchar](50) NOT NULL,
	[motdepasse] [varchar](8) NOT NULL,
	[codepostal] [varchar](50) NULL,
	[permis] [varchar](50) NULL,
	[description] [varchar](max) NULL,
	[titreposte] [varchar](50) NULL,
	[photo] [nvarchar](255) NULL,
	[lienfacebook] [varchar](255) NULL,
	[lieninstagram] [varchar](255) NULL,
	[lienlinkdin] [varchar](max) NULL,
	[lientwitter] [varchar](255) NULL,
	[cv] [varchar](max) NULL,
	[nombredexperience] [int] NULL,
	[datecreation] [date] NULL,
	[datemodification] [date] NULL,
	[numTelephone] [varchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PerssCents]    Script Date: 02/09/2024 15:52:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PerssCents](
	[idPersonnes] [int] NOT NULL,
	[idCentreIntérets] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[idPersonnes] ASC,
	[idCentreIntérets] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PerssComps]    Script Date: 02/09/2024 15:52:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PerssComps](
	[idPersonnes] [int] NOT NULL,
	[idCompétences] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[idPersonnes] ASC,
	[idCompétences] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PerssLangs]    Script Date: 02/09/2024 15:52:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PerssLangs](
	[idPersonnes] [int] NOT NULL,
	[idLangues] [int] NOT NULL,
	[niveau] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[idPersonnes] ASC,
	[idLangues] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Projets]    Script Date: 02/09/2024 15:52:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Projets](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[titre] [nvarchar](50) NOT NULL,
	[dateprojet] [datetime] NOT NULL,
	[client] [nvarchar](50) NOT NULL,
	[photo] [nvarchar](255) NULL,
	[lien] [nvarchar](255) NULL,
	[Remarque] [nvarchar](255) NULL,
	[datecreation] [datetime] NOT NULL,
	[datemodification] [datetime] NOT NULL,
	[idPersonnes] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RegisterRequests]    Script Date: 02/09/2024 15:52:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RegisterRequests](
	[nom] [nvarchar](100) NOT NULL,
	[prenom] [nvarchar](100) NOT NULL,
	[gmail] [nvarchar](255) NOT NULL,
	[numTelephone] [nvarchar](20) NOT NULL,
	[mot_de_passe] [nvarchar](255) NOT NULL,
	[mot_de_passe_confirmation] [nvarchar](255) NOT NULL,
UNIQUE NONCLUSTERED 
(
	[gmail] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[CentreIntérets] ADD  DEFAULT (getdate()) FOR [datecreation]
GO
ALTER TABLE [dbo].[CentreIntérets] ADD  DEFAULT (getdate()) FOR [datemodification]
GO
ALTER TABLE [dbo].[Compétences] ADD  DEFAULT (getdate()) FOR [datecreation]
GO
ALTER TABLE [dbo].[Compétences] ADD  DEFAULT (getdate()) FOR [datemodification]
GO
ALTER TABLE [dbo].[Experiences] ADD  DEFAULT (getdate()) FOR [datecreation]
GO
ALTER TABLE [dbo].[Experiences] ADD  DEFAULT (getdate()) FOR [datemodification]
GO
ALTER TABLE [dbo].[Formations] ADD  DEFAULT (getdate()) FOR [date_creation]
GO
ALTER TABLE [dbo].[Formations] ADD  DEFAULT (getdate()) FOR [date_modification]
GO
ALTER TABLE [dbo].[Formations]  WITH CHECK ADD  CONSTRAINT [FK__Formation__idPer__534D60F1] FOREIGN KEY([idPersonnes])
REFERENCES [dbo].[Personnes] ([id])
GO
ALTER TABLE [dbo].[Formations] CHECK CONSTRAINT [FK__Formation__idPer__534D60F1]
GO
ALTER TABLE [dbo].[PerssCents]  WITH CHECK ADD FOREIGN KEY([idCentreIntérets])
REFERENCES [dbo].[CentreIntérets] ([id])
GO
ALTER TABLE [dbo].[PerssCents]  WITH CHECK ADD FOREIGN KEY([idPersonnes])
REFERENCES [dbo].[Personnes] ([id])
GO
ALTER TABLE [dbo].[PerssComps]  WITH CHECK ADD FOREIGN KEY([idCompétences])
REFERENCES [dbo].[Compétences] ([id])
GO
ALTER TABLE [dbo].[PerssComps]  WITH CHECK ADD FOREIGN KEY([idPersonnes])
REFERENCES [dbo].[Personnes] ([id])
GO
ALTER TABLE [dbo].[PerssLangs]  WITH CHECK ADD FOREIGN KEY([idLangues])
REFERENCES [dbo].[Langues] ([id])
GO
ALTER TABLE [dbo].[PerssLangs]  WITH CHECK ADD FOREIGN KEY([idPersonnes])
REFERENCES [dbo].[Personnes] ([id])
GO
ALTER TABLE [dbo].[Projets]  WITH CHECK ADD FOREIGN KEY([idPersonnes])
REFERENCES [dbo].[Personnes] ([id])
GO
USE [master]
GO
ALTER DATABASE [badr] SET  READ_WRITE 
GO
