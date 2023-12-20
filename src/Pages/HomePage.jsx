
import { Box, Button, Center, Flex, Grid, Heading, Image, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import home from '../Assets/home.png'
import '../Css/Home.css'
import { shopCategory } from '../component/HomeComponent/navComponent/NavItem'
import HomeService from '../component/HomeComponent/HomeService'
import BestDeal from '../component/HomeComponent/BestDeal'
import DemoCarousel from '../component/HomeComponent/DemoCarousel'
import { SearchContext } from '../context/SearchContextProvider'
import { ProductCard } from '../component/ProductComponent/ProductCard'
import ProductPage from './ProductPage'
import { NavLink, useNavigate } from 'react-router-dom'
import Footer from '../component/HomeComponent/Footer'

const HomePage = () => {
  const text = useColorModeValue('light','dark')
  const textColor = text==='dark'?'gray.100':'blackAlpha.900'
  const {status} = useContext(SearchContext);
  const navigate = useNavigate()

  useEffect(()=>{
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  },[])

  return (
    status ? navigate('/products') : 
    <Box pt="70px">
      {/* Top Main Image Section here  */}
      <Box w="100%">
        <Box position={'relative'} w="100%" h='100vh' bgImg={home} bgRepeat={'no-repeat'} bgSize={'cover'} bgPosition={'center'} display={{ base: 'none', md: 'none', lg: 'block' }}>
         <Flex pos={'absolute'} left={'50px'} top={'150px'} direction={'column'} gap="20px" color={'blackAlpha.900'}>
         <Heading fontSize={'50px'} color={'yellow'}>Mua sắm cùng tôi</Heading>
          <Heading color={'yellow'}>Trải nghiệm mới</Heading>
          <Heading fontSize={'40px'} letterSpacing={'5px'} color={'yellow'}>Giá cả tốt</Heading>
          <NavLink to="/products"><Button variant={'outline'} borderRadius={'20px'} border={'1px solid yellow'} w='200px' color={'yellow'}>Mua ngay</Button></NavLink>
         </Flex>
        </Box>
       <Box w="100%" display={{ base: 'block', md: 'block', lg: 'none' }}  >
       <DemoCarousel />
       </Box>
      </Box>

      {/* Best deal section  */}
      <BestDeal />
      
      {/* all services section here which is provided by the company  */}
      <HomeService />
      <Footer />
    </Box>
  )
}

export default HomePage