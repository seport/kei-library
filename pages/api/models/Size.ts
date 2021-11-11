export const sizesQuery: any = (_parent: any, _args: any, context: any) => {
  return context.prisma.size.findMany({ include: {items: true}})
}
