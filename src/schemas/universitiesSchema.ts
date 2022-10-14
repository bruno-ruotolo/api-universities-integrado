import Joi from "joi";

import { CreateUniversity, UpdateUniversity } from "./../interfaces/index";

const createUniversitySchema = Joi.object<CreateUniversity>({
  alpha_two_code: Joi.string().max(2).required(),
  web_pages: Joi.array().required(),
  name: Joi.string().required(),
  country: Joi.string().required(),
  domains: Joi.array().required(),
  "state-province": Joi.string().allow("").allow(null),
});

const updateUniversitySchema = Joi.object<UpdateUniversity>({
  web_pages: Joi.array().required(),
  name: Joi.string().required(),
  domains: Joi.array().required(),
});

const universitySchema = { createUniversitySchema, updateUniversitySchema };

export default universitySchema;
