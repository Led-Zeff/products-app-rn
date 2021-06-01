import { Picker } from '@react-native-picker/picker';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Image, ScrollView, Text, TextInput, View } from 'react-native';
import { ProductsContext } from '../context/ProductsContext';
import { useCategories } from '../hooks/useCategories';
import { useForm } from '../hooks/useForm';
import { Product } from '../model/product';
import { ProductsStackParams } from '../navigation/ProductsNavigator';

interface Props extends StackScreenProps<ProductsStackParams, 'Product'> {}

export const ProductSreen = ({ route, navigation }: Props) => {
  const { loadProduct, addProduct, updateProduct } =
    useContext(ProductsContext);
  const { id, name } = route.params;
  const { value, onChange } = useForm({ name, category: '' });
  const { categories } = useCategories();
  const [product, setProduct] = useState({} as Product);

  const save = async () => {
    if (id) {
      await updateProduct(id, value.name ?? '', value.category);
    } else {
      await addProduct(value.name ?? '', value.category);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: name ?? 'New product',
    });
  }, [navigation, name]);

  useEffect(() => {
    if (id) {
      loadProduct(id)
        .then(prod => {
          setProduct(prod);
          onChange(prod.categoria._id, 'category');
        })
        .catch(console.log);
    }
  }, [id]);

  return (
    <View style={{ padding: 10 }}>
      <ScrollView>
        <Text>Name</Text>
        <TextInput
          value={value.name}
          onChangeText={val => onChange(val, 'name')}
          underlineColorAndroid="black"
        />

        <Text>Category</Text>
        <Picker
          selectedValue={value.category}
          onValueChange={item => onChange(item, 'category')}>
          <Picker.Item label="" />
          {categories.map(cat => (
            <Picker.Item label={cat.nombre} value={cat._id} key={cat._id} />
          ))}
        </Picker>

        <Button title="Save" onPress={save} />

        {id && (
          <>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Button title="Camera" />
              <Button title="Galery" />
            </View>

            {product.img && (
              <Image
                source={{ uri: product.img }}
                style={{ width: 300, height: 300 }}
              />
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};
