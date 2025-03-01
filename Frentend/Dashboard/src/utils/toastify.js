import { ToastContainer, toast } from "react-toastify";

export const handleMessage = (msg) => 
{
    toast.success(msg,{
        position: "top-right"
    });
}


export const handleError = (msg) => 
{
    toast.error(msg,
        {
            position: "top-right"
        }
    );
}