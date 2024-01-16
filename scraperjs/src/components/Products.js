import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

const Products = ({ data }) => {
  return (
    <List>
      {data.map((product, index) => (
        <React.Fragment key={index}>
          <ListItem>
            <Typography variant="h6">{product.store}</Typography>
            {/* Other product details */}
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
};

export default Products;
