import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type RegistrationField = {
  login: string;
  email: string;
  password: string;
};

type PayloadCaptchaThunk = {
  captchaName: string;
  captchaId: string;
  captcha: string;
};

type RegistrationState = {
  captchaUnblock: boolean;
  captchaName: string;
  captchaId: string;
  captcha: string;

  text: Array<string>;
  toggle: boolean;
  modal: boolean;

  field: {
    denotation: string[];
    sprite: string[];
    type: string[];
  };
};

type Captcha = {
  captcha?: string;
  captchaId?: string;
};

type CaptchaConfirm = { countOfImages: number[]; captcha: string };

const initialState: RegistrationState = {
  captchaUnblock: false,
  captchaName: "",
  captchaId: "",
  captcha: "",
  toggle: false,
  modal: false,
  field: {
    type: ["text", "email", "password", "password"],
    sprite: ["user", "email", "lock", "lock"],
    denotation: ["Логин", "Электронная почта", "Пароль", "Повторите пароль"],
  },
  text: [
    `предоставлять достоверную и актуальную 
      информацию при регистрации и добавлении объекта;`,
    `добавлять фотографии объектов соответствующие
    действительности. Администрация сайта sdaem.by оставляет за
    собой право удалять любую информацию, размещенную
    пользователем, если сочтет, что информация не соответствует
    действительности, носит оскорбительный характер, нарушает
    права и законные интересы других граждан либо действующее 
    законодательство Республики Беларусь.`,
  ],
};

export const redistrationThunk = createAsyncThunk(
  "redistration/redistrationUser",
  async ({ login, email, password }: RegistrationField) => {
    await axios.post<string>("http://localhost:3000/api/create-account/", {
      login,
      email,
      password,
    });
  }
);

export const captchaThunk = createAsyncThunk(
  "redistration/captcha",
  async ({ captcha, captchaId }: Captcha) => {
    let { data } = await axios.get<PayloadCaptchaThunk>(
      "http://localhost:3000/api/captcha/",
      {
        params: { captcha, captchaId },
      }
    );
    return data;
  }
);

export const confirmDataThunk = createAsyncThunk(
  "redistration/captchaConfirm",
  async ({ countOfImages, captcha }: CaptchaConfirm) => {
    let { data } = await axios.get<boolean>(
      "http://localhost:3000/api/checkCaptcha/",
      {
        params: {
          captcha,
          massive: JSON.stringify(countOfImages),
        },
      }
    );
    if (data == false) {
      throw Error("false");
    }
    return data;
  }
);

export const redistrationSlice = createSlice({
  name: "redistration",
  initialState,
  reducers: {
    toggleCaptcha(state, action: PayloadAction<boolean>) {
      state.toggle = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(redistrationThunk.fulfilled, (state) => {
      state.modal = true;
    });
    builder.addCase(
      captchaThunk.fulfilled,
      (state, action: PayloadAction<PayloadCaptchaThunk>) => {
        state.captchaName = action.payload.captchaName;
        state.captchaId = action.payload.captchaId;
        state.captcha = action.payload.captcha;
      }
    );
    builder.addCase(captchaThunk.rejected, (state) => {
      state.captcha = "";
    });
    builder.addCase(
      confirmDataThunk.fulfilled,
      (state, action: PayloadAction<boolean>) => {
        state.captchaUnblock = action.payload;
      }
    );
  },
});

export const { toggleCaptcha } = redistrationSlice.actions;

export default redistrationSlice.reducer;
