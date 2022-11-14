CREATE TABLE "public.equipe" (
	"id" serial NOT NULL,
	"name" serial(255) NOT NULL,
	"leader" serial(255) NOT NULL,
	CONSTRAINT "equipe_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.usuario" (
	"id" serial NOT NULL,
	"username" serial(255) NOT NULL,
	"email" serial(255) NOT NULL,
	"first_name" serial(255) NOT NULL,
	"last_name" serial(255) NOT NULL,
	"password" serial(255) NOT NULL,
	"squad" serial(255),
	"is_adm" serial(255) NOT NULL,
	CONSTRAINT "usuario_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "equipe" ADD CONSTRAINT "equipe_fk0" FOREIGN KEY ("leader") REFERENCES "usuario"("id");

ALTER TABLE "usuario" ADD CONSTRAINT "usuario_fk0" FOREIGN KEY ("squad") REFERENCES "equipe"("id");



