import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import StorefrontIcon from '@mui/icons-material/Storefront';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CopyrightIcon from '@mui/icons-material/Copyright';
import NextLink from 'next/link';
import { Button, Divider, Link, Typography } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';

export const Footer = () => {
    return (
        <>
            <Box sx={{ backgroundColor: '#5bb6d6' }} >
                <Divider sx={{ my: 1 }} />
                <Box display='flex' justifyContent='space-around'>
                    <NextLink href='/'>
                        <Link>
                            <Button>
                                <InstagramIcon sx={{ fontSize: '2em', color: 'aliceblue' }} />
                            </Button>
                        </Link>
                    </NextLink>
                    <NextLink href='/'>
                        <Link>
                            <Button>
                                <StorefrontIcon sx={{ fontSize: '2em', color: 'aliceblue' }} />
                            </Button>
                        </Link>
                    </NextLink>
                    <NextLink href='/'>
                        <Link>
                            <Button>
                                <WhatsAppIcon sx={{ fontSize: '2em', color: 'aliceblue' }} />
                            </Button>
                        </Link>
                    </NextLink>
                </Box>
                <Box display='flex' justifyContent='center' sx={{ mt: 3 }} >
                    <Typography component='h5'>
                        <CopyrightIcon sx={{ fontSize: 16 }} />   Copyright Yo Te Cielo - 2022
                    </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box display='flex' justifyContent='center' sx={{ m: 3 }} >
                    <Typography component='h5'>
                        <CodeIcon sx={{ fontSize: 20 }} />   Developed by Jorge Ochipinti
                    </Typography>
                </Box>

            </Box>
        </>
    )
}
