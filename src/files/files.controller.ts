import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Patch,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { UpdateFileDto } from './dto/update-file.dto'
import { FilesService } from './files.service'
import { Public, ResponseMessage } from '../decorator/customize'

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Public()
  @Post('upload-a-file')
  @ResponseMessage('Upload single file')
  @UseInterceptors(FileInterceptor('file')) //file === key (client truyen leen server)
  uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType:
            /^(jpg|image\/jpeg|png|image\/png|gif|image\/gif|txt|text\/plain|pdf|application\/pdf|doc|application\/msword|docx)$/i
        })
        .addMaxSizeValidator({
          maxSize: 1024 * 1024 //kb = 1MB
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
        })
    )
    file: Express.Multer.File
  ) {
    console.log(file)
    return { fileName: file.fieldname }
  }

  @Public()
  @Post('upload-files')
  @ResponseMessage('Upload files')
  @UseInterceptors(FilesInterceptor('files')) //files === key (client truyen leen server)
  uploadFiles(
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType:
            /^(jpg|image\/jpeg|png|image\/png|gif|image\/gif|txt|text\/plain|pdf|application\/pdf|doc|application\/msword|docx)$/i
        })
        .addMaxSizeValidator({
          maxSize: 1024 * 1024 //kb = 1MB
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
        })
    )
    files: Array<Express.Multer.File>
  ) {
    console.log(files)
    return { fileName: files }
  }

  @Get()
  findAll() {
    return this.filesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.filesService.update(+id, updateFileDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesService.remove(+id)
  }
}
