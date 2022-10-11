import "./styles.css";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";

type FormInput = {
  lastName: string;
  firstName: string;
};

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInput>();

  // バリデーションが成功した場合に実行。dataには、バリデーションが成功したフィールド情報が含まれている。
  const success: SubmitHandler<FormInput> = (data) => console.log(data);

  // バリデーションが失敗した場合に実行。errosには、バリデーションが失敗したフィールド情報が含まれている。
  const error: SubmitErrorHandler<FormInput> = (erros) => console.log(erros);

  return (
    <form onSubmit={handleSubmit(success, error)}>
      <p>
      handleSubmit メソッドは、バリデーションの成否によって、引数に渡した関数（コールバック関数）の実行を振り分けられます。<br />
handleSubmit メソッド の第 1 引数のコールバック関数は、フォームのフィールドに対する全てのバリデーションが成功した合にみ、実行されます。一方、第 2 引数にコールバック関数は、フィールドのバリデーションがどれか 1 つでも失敗した場合に、実行されます。<br />

TypeScript で書く場合は、コールバック関数の props 型の宣言用に、 SubmitHandler と SubmitErrorHandler が用意されています。

      </p>
      <label>
        姓
        <input
          {...register("lastName", {
            required: { value: true, message: "名の入力は必須です" }
          })}
        />
      </label>
      {errors.lastName && <p className="error">{errors.lastName.message}</p>}
      <label>
        名
        <input
          {...register("firstName", {
            required: { value: true, message: "名の入力は必須です" }
          })}
        />
      </label>
      {errors.firstName && <p className="error">{errors.firstName.message}</p>}
      <button>送信する</button>
    </form>
  );
}