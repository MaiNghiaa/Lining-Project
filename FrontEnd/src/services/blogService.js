import api from "./api";

export const getFeaturedEvents = async (type, limit) => {
  const limitStr = limit ? `limit: ${limit},` : "";
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
        type_id{
            title
            link_title
        }   
        title
        description
    }
  }`;
  const response = await api.post("/graphql", { query });
  return response.data.data.Blog;
};

export const getNewArrival = async () => {
  const query = `query{
    collection{
        id
        title
        product_id{
            id
            Products_id{
                id
                ma_san_pham
                name
                price
                image {
                    filename_disk
                }
            }
        }
    }
}`;
  const response = await api.post("/graphql", { query });
  return response.data.data.collection;
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
    const response = await api.post("/graphql", { query });
    return response.data.data.Blog[0];
  } catch (error) {
    console.error("Error fetching blog post:", error);
    throw error;
  }
};
export const getItemByCollection = async (title) => {
  const query = `
        query{
            collection(filter:{
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
                        color_id{
                            color_of_product_id{
                                id
                                title
                            }
                        }
                        type_id{
                            type_of_product_id{
                                id
                                collection_name
                            }
                        }
                        line_id{
                            id
                            line_of_product_id{
                                id
                                title
                            }
                        }
                        size_id{
                            id
                            product_size_id{
                                id
                                title
                            }
                        }
                        gender_id{
                            product_gender_id{
                                id
                                title
                            }
                        }
                    }
                }
            }
        }
    `;

  try {
    const response = await fetch("http://localhost:8055/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const result = await response.json();
    return result; // Return the raw response
  } catch (error) {
    console.error("Error fetching collection items:", error);
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
                        color_id{
                            color_of_product_id{
                                id
                                title
                            }
                        }
                        type_id{
                            type_of_product_id{
                                id
                                collection_name
                            }
                        }
                        line_id{
                            id
                            line_of_product_id{
                                id
                                title
                            }
                        }
                        size_id{
                            id
                            product_size_id{
                                id
                                title
                            }
                        }
                        gender_id{
                            product_gender_id{
                                id
                                title
                            }
                        }
       
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
    const response = await api.post("/graphql", { query });
    return response.data.data.Products;
  } catch (error) {
    console.error("Error fetching detail item by id:", error);
    throw error;
  }
};

export const getBannerBlog = async () => {
  const query = `query{
    Blog{
      id
      meta_data
      image_cover{
        filename_disk
      }
      type_id{
        title
        link_title
      }
    }
  }`;
  const response = await api.post("/graphql", { query });
  return response.data.data.Blog;
};

export const getMoreImage = async (id) => {
  const query = `query{
    product_image(filter:{
        product_id:{
            ma_san_pham:{
                    _eq:"${id}"
            }
        }
    }){
        id
        images{
            directus_files_id{
                filename_disk
            }
        }
    }
}
`;
  const response = await api.post("/graphql", { query });
  return response.data.data.product_image;
};

export const getStockById = async (id) => {
  const query = `query{
    stock_products(filter:{
    product_id:{
        ma_san_pham:{
            _eq: "${id}"
        }
    }
    }   ){
        id
        product_id{
            id
            ma_san_pham
            
        }
        color_id{
        title
            hex_color
        }
        stock
        size_id{
            id
            title
        }
    }
}`;
  try {
    const response = await api.post("/graphql", { query });
    return response.data.data.stock_products;
  } catch (error) {
    console.error("Error fetching stock by id:", error);
    throw error;
  }
};

export const getAllStock = async () => {
  const query =
  `
  query{
    stock_products{
        id
        product_id{
            id
        }
        color_id{
            title
            hex_color
        }
        stock
        size_id{
            id
            title
        }
    }
}
  `;
  try {
    const response = await api.post("/graphql", { query });
    return response.data.data.stock_products;
  } catch (error) {
    console.error("Error fetching stock by id:", error);
    throw error;
  }
};
