import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class Classes1596941081393 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'classes',
              columns: [
                {
                  name: 'id',
                  type: 'uuid',
                  isPrimary: true,
                  generationStrategy: 'uuid',
                  default: 'uuid_generate_v4()',
                },
                { name: 'subject',
                  type: 'varchar',                  
                },
                {   name: 'cost',
                    type: 'decimal',                    
                },
                {   
                name: 'user_id',
                type: 'uuid',
                isNullable: true,                  
            },                            
                                          
              ],
            }),
          );
          await queryRunner.createForeignKey(
            'classes',
            new TableForeignKey({
              name: 'ClassesUser',
              columnNames: ['user_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'users',
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE',
            }),
          );
        }
      
        public async down(queryRunner: QueryRunner): Promise<void> {
          await queryRunner.dropTable('classes');
        }

}
