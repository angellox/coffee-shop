import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {

    const prisma = new PrismaClient();
    const { pedidos, nombre, total, fecha } = req.body;

    if(req.method === 'POST') {
        const orden = await prisma.orden.create({
            data: {
                nombre,
                total,
                pedidos,
                fecha
            }
        });

        res.json(orden);
    }
}