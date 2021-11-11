export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Color = {
  __typename?: 'Color';
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  items?: Maybe<Array<Maybe<Item>>>;
  name: Scalars['String'];
};

export type Item = {
  __typename?: 'Item';
  colors?: Maybe<Array<Color>>;
  createdAt: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image?: Maybe<Array<ItemImage>>;
  itemNumber: Scalars['String'];
  material?: Maybe<Scalars['String']>;
  measurements?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  price?: Maybe<Scalars['Int']>;
  sizes?: Maybe<Array<Size>>;
  userClosets?: Maybe<Array<User>>;
};

export type ItemImage = {
  __typename?: 'ItemImage';
  createdAt: Scalars['String'];
  data: Scalars['String'];
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addItemToCloset?: Maybe<Item>;
  deleteItem?: Maybe<Item>;
  postItem: Item;
  removeItemFromCloset?: Maybe<Item>;
  updateItem?: Maybe<Item>;
};


export type MutationAddItemToClosetArgs = {
  itemId: Scalars['ID'];
};


export type MutationDeleteItemArgs = {
  id: Scalars['ID'];
};


export type MutationPostItemArgs = {
  colors?: Maybe<Array<Scalars['String']>>;
  description?: Maybe<Scalars['String']>;
  itemNumber: Scalars['String'];
  material?: Maybe<Scalars['String']>;
  measurements?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  price?: Maybe<Scalars['Int']>;
  sizes?: Maybe<Array<Scalars['String']>>;
};


export type MutationRemoveItemFromClosetArgs = {
  itemId: Scalars['ID'];
};


export type MutationUpdateItemArgs = {
  colors?: Maybe<Array<Scalars['String']>>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  itemNumber?: Maybe<Scalars['String']>;
  material?: Maybe<Scalars['String']>;
  measurements?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
  sizes?: Maybe<Array<Scalars['String']>>;
};

export type Query = {
  __typename?: 'Query';
  closetItems?: Maybe<Array<Item>>;
  colors: Array<Color>;
  item?: Maybe<Item>;
  items: Array<Item>;
  sizes: Array<Size>;
  user?: Maybe<User>;
};


export type QueryItemArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type Size = {
  __typename?: 'Size';
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  items?: Maybe<Array<Maybe<Item>>>;
  name: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  closetItems?: Maybe<Array<Item>>;
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type ItemListQueryVariables = Exact<{ [key: string]: never; }>;


export type ItemListQuery = { __typename?: 'Query', items: Array<{ __typename?: 'Item', id: string, name: string, itemNumber: string, userClosets?: Array<{ __typename?: 'User', id: string }> | null | undefined, image?: Array<{ __typename?: 'ItemImage', data: string }> | null | undefined }> };
