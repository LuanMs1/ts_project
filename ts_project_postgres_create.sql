CREATE TABLE "equipe" (
	"id" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"leader" varchar(255) NOT NULL,
	CONSTRAINT "equipe_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "usuario" (
	"id" varchar(255) NOT NULL,
	"username" varchar(255) NOT NULL,
	"email" varchar(255) UNIQUE NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"squad" varchar(255),
	"is_adm" boolean NOT NULL,
	CONSTRAINT "usuario_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "equipe" ADD CONSTRAINT "equipe_fk0" FOREIGN KEY ("leader") REFERENCES "usuario"("id");

ALTER TABLE "usuario" ADD CONSTRAINT "usuario_fk0" FOREIGN KEY ("squad") REFERENCES "equipe"("id");



