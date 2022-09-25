import { UploadOutlined } from '@mui/icons-material'
import { Button, Card, CardActions, CardMedia, Chip, Divider, FormGroup, Grid, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router';
import { LayoutClient } from '../../components'
import SendIcon from '@mui/icons-material/Send';
import EmentorsApi from '../../api/EmentorsApi';
import { useForm } from "react-hook-form";
import { isValidEmail } from '../../utils/validations';
import NativeVideoPlayer from '../../components/ui/VideoPlayer';

interface FormData {
    name: string
    lastname: string
    email: string
    transactionId: string
    message: string
    isQrDownload: false
    images: string[];
    videos: string[];
    createdAt: string;
    updatedAt: string;

}
const Create = () => {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null)
    const filevideoref = useRef<HTMLInputElement>(null)
    const [messageLength, setMessageLength] = useState<any>(0)
    const [isSubmit, setIsSubmit] = useState(false)
    const [isVideo, setIsVideo] = useState(false)
    const [isImage, setIsImage] = useState(false)


    const { register, handleSubmit, formState: { errors }, getValues, setValue, watch } = useForm<FormData>({
        defaultValues: {
            name: '',
            lastname: '',
            email: '',
            transactionId: '',
            message: '',
            images: [],
            videos: [],
            createdAt: '',
            updatedAt: ''
        }
    })

    const onSubmit = async (form: FormData) => {
        try {


            if (isValidEmail(form.email)) {
                const { data } = await EmentorsApi({
                    url: '/pedidos',
                    method: 'POST',
                    data: form
                })
                data && setIsSubmit(true)
                !data && alert('algo salio mal')
                console.log({ data })
                router.replace(`/pedidos/${data._id}`);
            } else {
                alert('Por favor revisa tu mail')
            }
        } catch (error) {
            console.log(error);
        }

    }

    const onFilesSelected = async ({ target }: any) => {
        setIsImage(true)
        if (!target.files || target.files.length === 0) {
            return;
        }
        try {
            for (const file of target.files) {
                const formData = new FormData();
                formData.append('file', file);
                const { data } = await EmentorsApi.post<{ message: string }>('/upload', formData);
                setValue('images', [...getValues('images'), data.message], { shouldValidate: true });
                console.log(data)
                data && setIsImage(false)
            }

        } catch (error) {
            console.log({ error });
        }
    }

    const onDeleteImage = (image: string) => {
        setValue(
            'images',
            getValues('images').filter(img => img !== image),
            { shouldValidate: true }
        );
    }

    const onFilesSelectedVideo = async ({ target }: any) => {
        setIsVideo(true)
        if (!target.files || target.files.length === 0) {
            return;
        }
        try {
            for (const file of target.files) {
                const formData = new FormData();
                formData.append('file', file);
                const { data } = await EmentorsApi.post<{ message: string }>('/videos', formData);
                setValue('videos', [...getValues('videos'), data.message], { shouldValidate: true });
                console.log(data)
                data && setIsVideo(false)
            }

        } catch (error) {
            console.log({ error });
        }
    }

    const onDeleteVideo = (image: string) => {
        setValue(
            'videos',
            getValues('images').filter(img => img !== image),
            { shouldValidate: true }
        );
    }

    const styles = {
        paperContainer: {
            minHeigth: '100vh',
            backgroundImage: `url(https://i.pinimg.com/736x/dc/b9/42/dcb942d66f560b3e12a84d91502ee5aa.jpg)`,
            backgroundSize: 'cover'

        }
    }
    return (
        <>
            <LayoutClient title='Crea tu mensaje'>
                <Box style={styles.paperContainer} sx={{
                    backgroundColor: '#5bb6d6', pb: 20
                }} >
                    <Box display='flex' justifyContent='center' >
                        <Typography variant='h3' sx={{ pt: 3, fontFamily: 'Special Elite', textAlign: 'center', color: 'black' }}>
                            Crea tu mensaje personalizado
                        </Typography>
                    </Box>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormGroup>
                            <Box flexDirection='column'>
                                <Box display='flex' justifyContent='center' sx={{ mt: 5 }}>
                                    <TextField label="Número de Pedido" variant="outlined"
                                        className="inputRounded"

                                        {...register('transactionId', {
                                            required: 'Este campo es requerido',
                                            minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                                        })}
                                    />

                                </Box>
                                <Box display='flex' justifyContent='center' sx={{ mt: 2 }}>

                                    <TextField label="Nombre" variant="outlined"
                                        className="inputRounded"

                                        {...register('name', {
                                            required: 'Este campo es requerido',
                                            minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                                        })}
                                    />

                                </Box>
                                <Box display='flex' justifyContent='center' sx={{ mt: 2 }}>

                                    <TextField label="Apellido" variant="outlined"
                                        className="inputRounded"

                                        {...register('lastname', {
                                            required: 'Este campo es requerido',
                                            minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                                        })}
                                    />

                                </Box>
                                <Box display='flex' justifyContent='center' sx={{ mt: 2 }}>

                                    <TextField label="Email" variant="outlined"
                                        {...register('email', {
                                            required: 'Este campo es requerido',
                                            minLength: { value: 2, message: 'Mínimo 2 caracteres' },
                                        })}
                                        className="inputRounded"

                                    />

                                </Box>
                                <Box display='flex' justifyContent='center' sx={{ mt: 2 }}>
                                    <Box display='flex' flexDirection='column'>
                                        <Box display='flex' justifyContent='center' sx={{ mt: 2 }}>


                                            <TextField
                                                label="Mensaje"
                                                multiline
                                                rows={4}
                                                variant="outlined"
                                                {...register('message', {
                                                    required: 'Este campo es requerido',
                                                    minLength: { value: 2, message: 'Mínimo 2 caracteres' },
                                                    maxLength: { value: 140, message: 'Máximo 140 caracteres' }
                                                })}
                                                onChange={(e) => setMessageLength(e.target.value.length)}
                                                className="inputRounded"
                                            />
                                        </Box>

                                        <Box display='flex' justifyContent='end' sx={{ mt: 2, position: 'relative', bottom: '65px', right: '2px', zIndex: 'tooltip' }}>
                                            <Chip label={`${messageLength}/140`} variant='outlined' color={messageLength > 140 ? 'error' : 'primary'} />
                                        </Box>
                                    </Box>
                                </Box>

                                <Box display='flex' justifyContent='center' sx={{ mt: 2 }}>
                                    <Button
                                        variant='outlined'
                                        startIcon={<UploadOutlined />}
                                        sx={{ mb: 3, backgroundColor: 'white' }}
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        Cargar imagenes
                                    </Button>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        multiple
                                        accept='image/png, image/gif, image/jpeg'
                                        style={{ display: 'none' }}
                                        onChange={onFilesSelected}
                                    />
                                </Box>
                                <Box display='flex' justifyContent='center'>
                                    {
                                        isImage && (
                                            <Chip variant='outlined' label='Espere por favor' />
                                        )
                                    }
                                </Box>
                                <Grid container spacing={2}>
                                    {
                                        getValues('images').map(img => (
                                            <Grid item xs={4} sm={3} key={img}>
                                                <Card>
                                                    <CardMedia
                                                        component='img'
                                                        className='fadeIn'
                                                        image={img}
                                                        alt={img}
                                                    />
                                                    <CardActions>
                                                        <Button
                                                            fullWidth
                                                            color="error"
                                                            onClick={() => onDeleteImage(img)}
                                                        >
                                                            Borrar
                                                        </Button>
                                                    </CardActions>
                                                </Card>
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                                <Box display='flex' justifyContent='center' sx={{ mt: 2 }}>
                                    <Button
                                        variant='outlined'
                                        startIcon={<UploadOutlined />}
                                        sx={{ mb: 3, backgroundColor: 'white', display: isVideo ? 'false' : '' }}
                                        onClick={() => filevideoref.current?.click()}
                                    >
                                        Cargar video
                                    </Button>
                                    <input
                                        ref={filevideoref}
                                        type="file"
                                        multiple
                                        accept="video/*"
                                        style={{ display: 'none' }}
                                        onChange={onFilesSelectedVideo}
                                    />
                                </Box>
                                <Box display='flex' justifyContent='center'>
                                    {
                                        isVideo && (
                                            <Chip variant='outlined' label='Espere por favor' />
                                        )
                                    }
                                </Box>
                                {
                                    getValues('videos').map(e => (

                                        <Box sx={{ backgroundColor: 'white' }} key={e}>
                                            <NativeVideoPlayer url={e} />
                                            <Button
                                                fullWidth
                                                color="error"
                                                onClick={() => onDeleteVideo(e)}
                                            >
                                                Borrar
                                            </Button>
                                        </Box>


                                    ))
                                }
                                <Box display='flex' justifyContent='center' sx={{ mt: 2 }}>
                                    <Button
                                        variant='outlined'
                                        startIcon={<SendIcon />}
                                        sx={{ mb: 3, backgroundColor: 'white' }}
                                        type='submit'
                                    >
                                        Enviar
                                    </Button>
                                </Box>
                                <Box display='flex' justifyContent='center' sx={{ mt: 2 }}>

                                    {
                                        isSubmit &&
                                        (
                                            <Chip label='por favor espere...' />
                                        )
                                    }
                                </Box>
                            </Box>
                        </FormGroup>
                    </form>
                </Box>
            </LayoutClient>
        </>
    )
}

export default Create


