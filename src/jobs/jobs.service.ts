import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  async create(createJobDto: CreateJobDto) {
    // Map DTO fields to Prisma fields
    return this.prisma.job.create({
      data: {
        ...createJobDto,
        companylogo: createJobDto.companylogo ?? null,
        salarydisplay: createJobDto.salarydisplay ?? null,
      },
    });
  }

  async findAll(query: any) {
    // Filtering logic based on query params
    const where: any = {};
    if (query.title)
      where.title = { contains: query.title, mode: 'insensitive' };
    if (query.location)
      where.location = { contains: query.location, mode: 'insensitive' };
    if (query.jobtype)
      where.jobtype = { equals: query.jobtype, mode: 'insensitive' };
    if (query.salarymin || query.salarymax) {
      where.AND = [
        ...(query.salarymin
          ? [{ salarymin: { gte: Number(query.salarymin) } }]
          : []),
        ...(query.salarymax
          ? [{ salarymax: { lte: Number(query.salarymax) } }]
          : []),
      ];
    }
    return this.prisma.job.findMany({ where, orderBy: { postedat: 'desc' } });
  }

  async findOne(id: string) {
    const job = await this.prisma.job.findUnique({ where: { id } });
    if (!job) throw new NotFoundException('Job not found');
    return job;
  }

  async update(id: string, updateJobDto: UpdateJobDto) {
    // Map DTO fields to Prisma fields
    return this.prisma.job.update({
      where: { id },
      data: {
        ...updateJobDto,
        companylogo: updateJobDto.companylogo ?? undefined,
        salarydisplay: updateJobDto.salarydisplay ?? undefined,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.job.delete({ where: { id } });
  }
}
