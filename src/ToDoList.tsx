import { useForm } from "react-hook-form";

interface IForm{
    email: string;
    username: string;
    password: string;
    passwordCheck: string;
}

function Join(){
    const {register, handleSubmit, setError, formState: {errors}} = useForm<IForm>({
        defaultValues: {
            email: "@naver.com",
        },
    });
    const onValid = (data: IForm) => {
        if(data.password !== data.passwordCheck){
            setError(
                "passwordCheck",
                {message: "비밀번호가 일치하지 않습니다."},
                {shouldFocus: true},
            );
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onValid)}>
                <input {...register("email", {
                    required: "필수로 작성해주세요.",
                    pattern: {
                        value: /^[A-Xa-z0-9._%+-]+@naver.com$/,
                        message: "네이버 이메일로만 가입 가능합니다.",
                    }
                })} placeholder="이메일"/>
                <span>{errors.email?.message}</span>
                <input {...register("username",{
                    required: "필수로 작성해주세요.",
                    validate: {
                        바보: (value) => value.includes("바보") ? "사용할 수 없는 단어가 포함되어있습니다." : true,
                    },
                })} placeholder="이름"/>
                <span>{errors.username?.message}</span>
                <input {...register("password", {
                    required: "필수로 작성해주세요.",
                    minLength: {
                        value: 8,
                        message: "8자 이상 입력해주세요.",
                    },
                })} placeholder="비밀번호"/>
                <span>{errors.password?.message}</span>
                <input {...register("passwordCheck", {
                    required: "필수로 작성해주세요.",
                    minLength: {
                        value: 8,
                        message: "8자 이상 입력해주세요.",
                    },
                })} placeholder="비밀번호확인"/>
                <span>{errors.passwordCheck?.message}</span>
                <button>가입하기</button>
            </form>
        </div>
    );
}

export default Join;