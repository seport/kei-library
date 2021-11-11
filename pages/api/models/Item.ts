export const itemsQuery: any = async (_parent: any, args: any, context: any) => {
  const where = args.search ? {
    OR: [
      {
        name: { contains: args.search}
      },
      {
        description: { contains: args.search}
      },
      {
        material: { contains: args.search }
      },
      {
        itemNumber: args.search
      }
    ]
  } : {}

  const count = await context.prisma.item.count({where})
  const totalPages = Math.ceil(count / args.take)
  const currentPage = Math.ceil(args.skip / args.take) + 1

  const results = context.prisma.item.findMany({
    where,
    include: {
      colors: true, 
      sizes: true, 
      userClosets: true, 
      image: true
    },
    skip: args.skip || 0,
    take: args.take || 20,
  })

  // const totalPages = Math.ceil(results.length / args.take)
  return {results, currentPage: currentPage, totalPages: totalPages, totalResults: count }
}

export const closetItemsQuery: any = (_parent: any, args: any, context: any) => {
  return context.prisma.item.findMany({
    where: {
      userClosets: {some: {id: context.session.userId}}
    },
    include: {userClosets: true, image: true}
  })
}

export const itemQuery: any = (_parent: any, args: any, context: any) => {
  const userClosetsInclude = context.session ? 
    {
      userClosets: {
        where: {
          id: context.session.userId
        }
      }
    } : {userClosets: false}
  return context.prisma.item.findUnique({
    where: {
      id: parseInt(args.id),
    },
    include: {
      colors: true, 
      sizes: true, 
      image: true,
      ...userClosetsInclude
    }
  })
}

export const postItemMutation: any = (_parent: any, args: any, context: any) => {
  const newItem = context.prisma.item.create({
    data: {
      ...args,
      colors: args.colors ? {connectOrCreate: args.colors.map((color: any) => ({where: {name: color}, create: {name: color}}))} : undefined,
      sizes: args.sizes ? {connectOrCreate: args.sizes.map((size: any) => ({where: {name: size}, create: {name: size}}))} : undefined,
    },
    include: {
      colors: true,
      sizes: true,
    }
  })
  return newItem
}

export const updateItemMutation: any = async (_parent: any, args: any, context: any) => {
  const {id, ...params} = args;
  return context.prisma.item.update({
    where: {
      id: parseInt(id)
    },
    data: {
      ...params,
      colors: params.colors ? {set: [], connectOrCreate: params.colors.map((color: any) => ({where: {name: color}, create: {name: color}}))} : undefined,
      sizes: params.sizes ? {set: [], connectOrCreate: params.sizes.map((size: any) => ({where: {name: size}, create: {name: size}}))} : undefined
    },
    include: {colors: true, sizes: true}
  })
}

export const deleteItemMutation: any = (_parent: any, args: any, context: any) => {
  return context.prisma.item.delete({
    where: {
      id: parseInt(args.id)
    },
    include: {colors: true, sizes: true}
  })
}

export const addItemToCloset: any = async (_parent: any, args: any, context: any) => {
  const {itemId, ...params} = args;
  return context.prisma.item.update({
    where: {
      id: parseInt(itemId)
    },
    data: {
      userClosets: {
        connect: {
          id: context.session.accountId
        }
      }
    },
  })
}

export const removeItemFromCloset: any = async (_parent: any, args: any, context: any) => {
  const {itemId, ...params} = args;
  return context.prisma.item.update({
    where: {
      id: parseInt(itemId)
    },
    data: {
      userClosets: {
        disconnect: {
          id: context.session.accountId
        }
      }
    },
  })
}