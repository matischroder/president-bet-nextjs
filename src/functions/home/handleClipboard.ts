import { toast } from "sonner";


const handleClipboard = (answser: string) => {
    const tempInput = document.createElement("input");
    tempInput.value = answser;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    toast.success("Respuesta copiada!");
};

export default handleClipboard