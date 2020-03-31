import supertest from "supertest";
import "@babel/polyfill";
import app from "../../src/app";
import {
  CODE_MESSAGE_OK,
  CODE_RESP_OK,
  CODE_RESP_BAD_REQUEST,
  CODE_MESSAGE_ERROR,
  GET_DATA_USER,
  REGISTER_NEW_USER,
  UPDATE_DATA_USER,
  CODE_RESP_NOT_FOUND
} from "../../src/app/utils/mensaje-salida.service";

const request = supertest(app);

const getUserData = {
  email: "claudio.monasterio@telefonica.com",
  rut: "76.124.890-1"
};

const dataNewUser = {
  name: "name",
  email: "email@gmail.com",
  perfil: "perfil",
  asignarContacto: true,
  tipoContacto: "Contacto Operacional"
};

const dataUpdateUser = {
  birthday: "12-10-1994",
  phone: "999999999",
  address: "San antonio 8666",
  commune: "Santiago",
  city: "Santiago"
};

describe("Test Maintainer User", () => {
  test("personalInformation correcto", async () => {
    const res = await request
      .post("/bff/se-bff-empresas/v1/maintainerUser/personalInformation")
      .send(getUserData);
    expect(res.statusCode).toEqual(CODE_RESP_OK);
    expect(res.body.codigo).toEqual(CODE_MESSAGE_OK);
    expect(res.body.mensaje).toEqual(GET_DATA_USER.SUCCESS);
  });

  test("personalInformation incorrecto", async () => {
    const res = await request
      .post("/bff/se-bff-empresas/v1/maintainerUser/personalInformation")
      .send({});
    expect(res.statusCode).toEqual(CODE_RESP_BAD_REQUEST);
    expect(res.body.codigo).toEqual(CODE_MESSAGE_ERROR);
    expect(res.body.mensaje).toEqual(GET_DATA_USER.ERROR);
  });

  test("Prueba registerNewUser OK", async () => {
    const res = await request
      .post("/bff/se-bff-empresas/v1/maintainerUser/registerNewUser")
      .send(dataNewUser);
    expect(res.statusCode).toEqual(CODE_RESP_OK);
    expect(res.body.codigo).toEqual(CODE_MESSAGE_OK);
    expect(res.body.mensaje).toEqual(REGISTER_NEW_USER.SUCCESS);
  });

  test("Prueba registerNewUser NO OK", async () => {
    const res = await request
      .post("/bff/se-bff-empresas/v1/maintainerUser/registerNewUser")
      .send({});
    expect(res.statusCode).toEqual(CODE_RESP_BAD_REQUEST);
    expect(res.body.codigo).toEqual(CODE_MESSAGE_ERROR);
    expect(res.body.mensaje).toEqual(REGISTER_NEW_USER.ERROR);
  });

  test("UpdatePerfilUser OK", async () => {
    const res = await request
      .put("/bff/se-bff-empresas/v1/maintainerUser/updatePerfilUser")
      .send(dataUpdateUser);
    expect(res.statusCode).toEqual(CODE_RESP_OK);
    expect(res.body.codigo).toEqual(CODE_MESSAGE_OK);
    expect(res.body.mensaje).toEqual(UPDATE_DATA_USER.SUCCESS);
  });

  test("UpdatePerfilUser NO OK", async () => {
    const res = await request
      .put("/bff/se-bff-empresas/v1/maintainerUser/updatePerfilUser")
      .send({});
    expect(res.statusCode).toEqual(CODE_RESP_BAD_REQUEST);
    expect(res.body.codigo).toEqual(CODE_MESSAGE_ERROR);
    expect(res.body.mensaje).toEqual(UPDATE_DATA_USER.ERROR);
  });

  test("ConveniosBiller NOT FOUND", async () => {
    const res = await request.get(
      "/bff/se-bff-empresas/v1/maintainerUser/assignedAgreements/?nameFile=Error_Params"
    );
    expect(res.statusCode).toEqual(CODE_RESP_NOT_FOUND);
    expect(res.body.codigo).toEqual(CODE_MESSAGE_ERROR);
    expect(res.body.mensaje).toEqual(UPDATE_DATA_USER.ERROR);
  });

  test("ConveniosBiller OK", async () => {
    const res = await request.get(
      "/bff/se-bff-empresas/v1/maintainerUser/assignedAgreements/?nameFile=Deptos. Coquimbo"
    );
    expect(res.statusCode).toEqual(CODE_RESP_OK);
  });
});
