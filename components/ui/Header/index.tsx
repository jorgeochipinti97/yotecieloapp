import { Box } from "@mui/material";
import Image from 'next/image';

export const Header = () => {

    return (
        <>
            <div data-aos="fade-right">

                <Box display='flex' justifyContent='center' sx={{ backgroundColor: 'white' }}>
                    <Box>
                        <Image src='/yotecielo.png' width={200} height={70} alt='yotecielo' />
                    </Box>
                    <Box>
                        <Image src='/pajaro.png' width={50} height={50} alt='yotecielo' />
                    </Box>
                </Box>
            </div>

        </>
    )
}
