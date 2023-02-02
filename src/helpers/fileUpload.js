// para subir imagenes al Cloudinary paso 3
// este archivo solo sube uno a la ves pero se va a disparar las veces q tenga informacion
export const fileUpload = async (file) => {
    if (!file) throw new Error('No tenemos ningun archivo a subir');


    const cloudUrl = 'https://api.cloudinary.com/v1_1/shue-cursos/upload'

    // aca construimos el fromData que usamos en el thunder client
    // formData es una funcion pero no se tiene que importar
    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file)

    // si todo sale mal por eso usamos el try
    try {

        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });


        if (!resp.ok) throw new Error('no se pudo subir la imagen')

        const cloudResp = await resp.json();

        return cloudResp.secure_url;

    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}