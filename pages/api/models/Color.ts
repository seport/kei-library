export const colorsQuery: any = (_parent: any, _args:  any, context: any) => {
  return context.prisma.color.findMany({ include: {items: true}})
}
