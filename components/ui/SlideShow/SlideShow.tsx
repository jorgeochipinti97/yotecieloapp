import React from 'react'
import { FC } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import Image from 'next/image';
import { Box } from '@mui/material';


interface Props {
    images: string[]
}

export const SlideShow: FC<Props> = ({ images }) => {
    return (
        <Box>
            <div className="slide-container">
                <Box>
                    <Slide
                        easing="ease"
                        duration={5000}
                        arrows={true}
                    >
                        {images.map((e, index) => (
                            <div className="each-slide-effect" key={index}>
                                <Box display='flex' justifyContent='center'>
                                    <Image src={e} width={500} height={500} />
                                </Box>
                            </div>
                        ))}
                    </Slide>
                </Box >
            </div>
        </Box>
    )
}
