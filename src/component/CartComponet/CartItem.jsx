
import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  Box,

  Image, useMediaQuery, useDisclosure, Divider, Select, useColorModeValue

} from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCartFn } from '../../redux/CartReducer/action';

import { ChevronDownIcon, DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { SERVER_URL } from '../../constraint';



export default function CartItem({
  ma,
  ten,
  gia,
  loai,
  imagePath,
  quantity,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargerThan800] = useMediaQuery('(min-width: 874px)')
  const [qty, setQty] = useState(quantity);
  const dispatch = useDispatch();
  const { cart } = useSelector(store => store.cartReducer);

  const [edit, togEdit] = useState(false)
  const handleEdit = () => {
    togEdit(!edit);
  }


  let totalPrice = 0;
  cart.forEach((cartItem) => {
    totalPrice += cartItem.gia * cartItem.quantity;
  }); // this for shoing total price


  const handleQuantity = (e) => {

    const upDatedData = cart.map((el) => {
      return el.ma === ma ? { ...el, quantity: +e.target.value } : el;
    })

    dispatch(updateCartFn(upDatedData));
    setQty(+e.target.value);
  };


  const handleDeleteQty = () => {
    const upDatedData = cart.filter((el) => {
      return el.ma !== ma
    })
    dispatch(updateCartFn(upDatedData));
  };

  return (


    <Box width={{ base: "full", sm: 'full', md: '2xl', lg: '2xl', xl: '2xl', '2xl': '4xl' }} bgColor={useColorModeValue('white', 'gray.800')} margin={'10px 0'} padding={'0 10px'} borderRadius={'10px'}>

      <Box display={'flex'} flexDirection={{ base: "column", md: "row" }} alignItems={'center'} justifyContent={{ base: 'center', md: "space-between" }} gap={'20px'}>

       <Flex justifyContent={{base:'space-between'}} gap={{base:'30px'}}>
       <Image width={{ base: "160px", sm: '200px', md: '100px', lg: '150px', xl: '200px' }} src={`${SERVER_URL}${imagePath[0]}`} alt={ten} />
        <Box className='TitleColorBrand' display={'flex'} flexDirection={'column'} justifyContent={'center'}>
          <Text fontWeight={'bold'} fontSize={'20px'}>{ten}...</Text>
          <Text fontWeight={'bold'} color={'orange.400'}>Hiệu: {loai}</Text>
        </Box>
       </Flex>

        <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} gap={'20px'} alignItems={'center'}>


          <Text fontWeight={'bold'} fontSize={'15px'}>{gia} {' VNĐ'}</Text>


          <Select placeholder={quantity} onChange={handleQuantity} w={{ base: '100px', }}>
            <option value='1'> 1</option>
            <option value='2'> 2</option>
            <option value='3'> 3</option>
            <option value='4'> 4</option>
            <option value='5'> 5</option>
          </Select>
          <Button onClick={handleDeleteQty}><DeleteIcon fontSize={"20px"} color={'red.500'} /></Button>

        </Box>

      </Box>

      <Box className='actions' display={'flex'} flexDirection='row' justifyContent={{base:'space-evenly',md:'flex-end'}} alignItems={"center"}>
      </Box>
      <Divider />
      <Divider />
    </Box>




  )
}