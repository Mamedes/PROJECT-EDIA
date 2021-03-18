import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export default class ClassSchedule1596941108447 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
        new Table({
          name: 'class_schedule',
          columns: [
            { name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            { name: 'week_day',
              type: 'varchar',
              
            },
            {   name: 'from',
                type: 'varchar',                
            },
            {   name: 'to',
                type: 'varchar',                
            },
            {   
              name: 'class_id',
              type: 'uuid',
              isNullable: true,                  
          },              
                                      
          ],
        }),
      );
      await queryRunner.createForeignKey(
        'class_schedule',
        new TableForeignKey({
          name: 'ClassScheduleClasses',
          columnNames: ['class_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'classes',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        }),
      );
    }
  
    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('class_schedule');
    }
}
