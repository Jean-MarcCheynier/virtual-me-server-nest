import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('SAP CAI')
@Controller('sapcai')
export class SapcaiController {}
