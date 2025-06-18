import api from './api';

export const getFeaturedEvents = async (type, limit) => {
  const limitStr = limit ? `limit: ${limit},` : '';
  const query = `query{
    Blog(${limitStr}filter:{
        type_id:{
            title:{
                _eq: "${type}"
            }
        }
    }){
         id
        meta_data
        image_cover{
            filename_disk
        }
        title
        description
    }
  }`;
  const response = await api.post('/graphql', { query });
  return response.data.data.Blog;
}; 

export const getNewArrival = async () => {
  const query = `query {
    Products(
      filter: {},
      sort: ["-date_created"],
      limit: 10
    ) {
      id
      ma_san_pham
      name
      price
      image {
        filename_disk
      }
    }
  }`;
  const response = await api.post('/graphql', { query });
  return response.data.data.Products;
}; 

export const getBlogPostById = async (id) => {
  const query = `query{
    Blog(filter:{
        id:{
            _eq: ${id}
        }
    }){
        id
        date_time
        meta_data
        type_id{
            id
            title
        }
        image_cover{
            filename_disk
        }
        title
        description
        content
        status
        date_created
        date_updated
    }
}`;
try {
  const response = await api.post('/graphql', { query });
  return response.data.data.Blog[0];
} catch (error) {
  console.error('Error fetching blog post:', error);
  throw error;
}
}
export const getItemByCollection = async (title, limit) => {
  try {
    const limitStr = limit ? `limit: ${limit},` : '';
    const response = await api.post('/graphql', {
      query: `
        query{
    collection(${limitStr}filter:{
        title: {
            _eq:"${title}"
        }
    }){
        id
        title
        product_id{
            id
            Products_id{
            id
            image {
              filename_disk
            }
            name
            price
            ma_san_pham
            description
          }
        }
    }
}
      `
    });
    return response.data.data.collection[0].product_id;
  } catch (error) {
    console.error('Error fetching items by collection:', error);
    throw error;
  }
};

export const getDetailItemById = async (id) => {
  const query = `query{
    Products(filter:{
        ma_san_pham:{
            _eq:"${id}"
        }
    }){
        id
        image{
            filename_disk
        }
        name
        price
        ma_san_pham
        Material
        content
        description
       
    }
}`;
 // color_id{
        //       id
        //    color_of_product_id{
        //     id
        //      hex_color
        //     title
        //    }
        // }
try {
  const response = await api.post('/graphql', { query });
  return response.data.data.Products;
} catch (error) {
  console.error('Error fetching detail item by id:', error);
  throw error;
}
};

