import { useContext } from "react";
import { useForm } from "react-hook-form";
import styles from "./form.module.css";
import api from "../../Api";
import { ModalContext } from "../../context/modalContext";
import s from '../Button/index.module.css'

const FormIn = () => {
  const { setActive } = useContext(ModalContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const onSubmit = async (data) => {
    try {
      let result = await api.singInUser(data);
      setActive(false);
      localStorage.setItem("token", result.token);
    } catch (error) {
      alert(error);
      if (error === "Ошибка: 401") {
        alert("Неправильные почта или пароль");
      } else alert(error);
    }
  };

  const handleClose = () => {
    setActive(false);
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h3>Авторизация</h3>
      <input
        className={styles.input}
        {...register("email", {
          required: "Обязательное поле",
          pattern: {
            value:
              /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
            message: "Введите адрес электронной почты в формате example@example.com.",
          },
        })}
        type="text"
        placeholder="Email"
      />
      <div className={styles.erroe__form}>
        {errors?.email && <p>{errors?.email?.message}</p>}
      </div>
      <input
        className={styles.input}
        {...register("password", {
          required: "Обязательное поле",
        })}
        type="text"
        placeholder="Пароль"
      />

      <div className={styles.erroe__form}>
        {errors?.password && <p>{errors?.password?.message}</p>}
      </div>
      <div className={styles.button_group}>
        <button className={s.btn_form}>Войти</button>
        <button className={s.btn_form} onClick={handleClose}>Отмена</button>
      </div>
    </form>
  );
};

export default FormIn;
