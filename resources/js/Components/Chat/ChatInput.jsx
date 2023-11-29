import { useForm } from "@inertiajs/react";
import TextInput from "../TextInput";

export default function ChatInput({receiver}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        message: "",
    });

   

    const submit = (e) => {
        e.preventDefault();
  
        post(route('chat.store', receiver?.id));

        reset('message');
    };

    return (
        <div className="fixed bottom-0 w-full bg-white pl-4">

            <form onSubmit={submit}>
                <TextInput className="h-16 focus:border-none shadow-none focus:shadow-none w-full overflow-y-auto border-none bg-white pt-3 focus:outline-none"
                    placeholder="Write message"
                    name="message"
                    value={data.message}
                    onChange={(e) => setData('message', e.target.value)}
                ></TextInput>
            </form>
        </div>
    );
}