import { makeStyles } from '@mui/material'
import { Box } from '@mui/system'
import Head from 'next/head'
import React, { FC } from 'react'
import { Footer } from '../Footer'
import { Header } from '../ui'

interface Props {
    title: string,
    children: React.ReactNode
}

export const LayoutClient: FC<Props> = ({ children, title }) => {
    const styles = {
        paperContainer: {
            minHeigth: '100vh',
            backgroundImage: `url(https://i.pinimg.com/736x/dc/b9/42/dcb942d66f560b3e12a84d91502ee5aa.jpg)`,
            backgroundSize: 'cover'

        }
    }
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <Header />
            <div data-aos="fade-right">
                <Box style={styles.paperContainer} >
                    <Box sx={{ backdropFilter: 'blur(10px)' }}>
                        {children}
                    </Box>
                </Box>
            </div>
            <div data-aos="fade-left">
                <Footer />
            </div>
        </>
    )
}
