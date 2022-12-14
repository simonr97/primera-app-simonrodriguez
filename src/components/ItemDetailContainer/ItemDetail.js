import { getProducts } from '../../asyncMock.js'
import { useEffect, useState } from 'react'
import ItemCount from '../ItemCount/ItemCount.js'
import { Spinner,
    Box,
    chakra,
    Container,
    Stack,
    Text,
    Image,
    Flex,
    VStack,
    Button,
    Heading,
    SimpleGrid,
    StackDivider,
    VisuallyHidden,
    List,
    ListItem, } from '@chakra-ui/react'
    import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';

const ItemDetail = () =>{

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        getProducts().then(prod => {
          setProducts(prod)
        }).catch(err =>{
            console.log(err)
        }).finally(()=>{
            setLoading(false)
        })
    },[])

    if (loading) {
        console.log('spinner')
        return (
            <Box  
                m={10} 
                textAlign={'center'}>
                <Spinner size='xl'/>
                <Text colorScheme='black' fontSize='2xl'>Cargando...</Text>
            </Box>
        )
    }

    const {key,name,smallDescription,price,category,img,stock,description} = products[1]

    let arr = description.splice(0, (description.length)/2);

    return(
        <Container maxW={'7xl'}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}>
        <Flex>
          <Image
            rounded={'md'}
            alt={'product image'}
            src={img}
            fit={'cover'}
            align={'center'}
            w={'100%'}
            h={{ base: '100%', sm: '400px', lg: '500px' }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={'header'}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
              {name}
            </Heading>
            <Text
              color='gray.900'
              fontWeight={300}
              fontSize={'2xl'}>
              U$D {price}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={'column'}
            divider={
              <StackDivider
                borderColor='gray.200'
              />
            }>
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                color='gray.500'
                fontSize={'2xl'}
                fontWeight={'300'}>
                {smallDescription}
              </Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color='yellow.500'
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}>
                Features
              </Text>

              <SimpleGrid columns={[2, null, 3]} spacing={10}>
                <List spacing={2}>
                  {description.map((d,key) => {
                    return(
                        <ListItem key={key}>{d}</ListItem>
                    )
                  })}
                </List>
                <List spacing={2}>
                  {arr.map((d,key) => {
                    return(
                        <ListItem key={key}>{d}</ListItem>
                    )
                  })}
                </List>
              </SimpleGrid>
            </Box>
            {/* <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color='yellow.500'
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}>
                Product Details
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Between lugs:
                  </Text>{' '}
                  20 mm
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Bracelet:
                  </Text>{' '}
                  leather strap
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Case:
                  </Text>{' '}
                  Steel
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Case diameter:
                  </Text>{' '}
                  42 mm
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Dial color:
                  </Text>{' '}
                  Black
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Crystal:
                  </Text>{' '}
                  Domed, scratch???resistant sapphire crystal with anti???reflective
                  treatment inside
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Water resistance:
                  </Text>{' '}
                  5 bar (50 metres / 167 feet){' '}
                </ListItem>
              </List>
            </Box> */}
          </Stack>

          <ItemCount onAdd={(count) => console.log(count)} stock={stock}/>

          <Stack direction="row" alignItems="center" justifyContent={'center'}>
            <MdLocalShipping />
            <Text>2-3 business days delivery</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
    )
}

export default ItemDetail