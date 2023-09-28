import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Product } from '../../schemas/product.schema';
import {
  CreateProductDto,
  ProductDto,
  UpdateProductDto,
  convertCreateDtoToEntity,
  convertUpdateDtoToEntity,
} from '../../dtos/product.dto';
import { convertEntityToDto } from 'src/entities/product.entity';
import { IResponse } from 'src/interfaces/iresponse';
import { Code } from 'src/types/tcode';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectConnection() private connection: Connection,
  ) {}

  async findAll(): Promise<IResponse> {
    const response: IResponse = {
      success: false,
      code: Code.FAILURE,
      reason: '',
      data: null,
    };
    let products: ProductDto[] = [];
    try {
      products = (await this.productModel.find().exec()).map((entity) => {
        console.log(`[ProductService] findAll entity`, entity, {
          ...entity,
          _id: entity._id.toString(),
        });
        return convertEntityToDto({
          ...entity['_doc'],
          _id: entity._id.toString(),
        });
      });
      response.success = true;
      response.code = Code.SUCCESS;
      response.data = products;
    } catch (error) {
      console.log(`[ProductService] findAll error`, error);
      response.reason = error.message;
    }
    return response;
  }

  async create(createProductDto: CreateProductDto): Promise<IResponse> {
    const session = await this.connection.startSession(),
      response: IResponse = {
        success: false,
        code: Code.FAILURE,
        reason: '',
        data: null,
      };
    session.startTransaction();
    try {
      const createdProduct = new this.productModel(
        convertCreateDtoToEntity(createProductDto),
      );
      const result = await createdProduct.save({ session });
      console.log(`[ProductService] createProduct result`, result);
      // Throw an error to test transaction rollback
      // throw new Error('This is a test error');
      response.success = true;
      response.code = Code.SUCCESS;
      response.data = convertEntityToDto({
        ...result['_doc'],
        _id: result._id.toString(),
      });
      await session.commitTransaction();
    } catch (error) {
      console.log(`[ProductService] createProduct abortTransaction`);
      try {
        await session.abortTransaction();
        console.log(`[ProductService] createProduct abortTransaction`);
      } catch (abortError) {
        console.error(
          `[ProductService] Error aborting transaction`,
          abortError,
        );
      }
      response.reason = error.message;
    } finally {
      console.log(`[ProductService] createProduct endSession`);
      session.endSession();
    }
    return response;
  }

  async update(
    productId: string,
    updateProductDto: UpdateProductDto,
  ): Promise<IResponse> {
    const session = await this.connection.startSession(),
      response: IResponse = {
        success: false,
        code: Code.FAILURE,
        reason: '',
        data: null,
      };
    session.startTransaction();
    try {
      const updatedProduct = await this.productModel.findByIdAndUpdate(
        productId,
        convertUpdateDtoToEntity(updateProductDto),
        { new: true, session },
      );
      // Throw an error to test transaction rollback
      // throw new Error('This is a test error');
      response.success = true;
      response.code = Code.SUCCESS;
      response.data = convertEntityToDto({
        ...updatedProduct['_doc'],
        _id: updatedProduct._id.toString(),
      });
      await session.commitTransaction();
    } catch (error) {
      console.log(`[ProductService] updateProduct abortTransaction`);
      try {
        await session.abortTransaction();
        console.log(`[ProductService] updateProduct abortTransaction`);
      } catch (abortError) {
        console.error(
          `[ProductService] Error aborting transaction`,
          abortError,
        );
      }
      response.reason = error.message;
    } finally {
      console.log(`[ProductService] updateProduct endSession`);
      session.endSession();
    }
    return response;
  }

  async delete(productId: string): Promise<IResponse> {
    const session = await this.connection.startSession(),
      response: IResponse = {
        success: false,
        code: Code.FAILURE,
        reason: '',
        data: null,
      };
    session.startTransaction();
    try {
      await this.productModel.findByIdAndDelete(productId).session(session);
      // Throw an error to test transaction rollback
      // throw new Error('This is a test error');
      response.success = true;
      response.code = Code.SUCCESS;
      response.reason = 'Product deleted successfully';
      await session.commitTransaction();
    } catch (error) {
      console.log(`[ProductService] deleteProduct abortTransaction`);
      try {
        await session.abortTransaction();
        console.log(`[ProductService] deleteProduct abortTransaction`);
      } catch (abortError) {
        console.error(
          `[ProductService] Error aborting transaction`,
          abortError,
        );
      }
      response.reason = error.message;
    } finally {
      console.log(`[ProductService] deleteProduct endSession`);
      session.endSession();
    }
    return response;
  }
}
