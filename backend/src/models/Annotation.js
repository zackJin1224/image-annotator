import pool from "../config/database.js";

class Annotation {
  static async create(annotationData) {
    const { imageId, startX, startY, endX, endY, label } = annotationData;

    const query = `
      INSERT INTO annotations (image_id, start_x, start_y, end_x, end_y, label)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;

    const values = [imageId, startX, startY, endX, endY, label];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findByImageId(imageId) {
    const query = `
      SELECT * FROM annotations 
      WHERE image_id = $1 
      ORDER BY created_at ASC
    `;

    const result = await pool.query(query, [imageId]);
    return result.rows;
  }

  static async findById(id) {
    const query = `SELECT * FROM annotations WHERE id = $1`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async update(id, updates) {
    const { label, startX, startY, endX, endY } = updates;

    const fields = [];
    const values = [];
    let paramIndex = 1;

    if (label !== undefined) {
      fields.push(`label = $${paramIndex}`);
      values.push(label);
      paramIndex++;
    }
    if (startX !== undefined) {
      fields.push(`start_x = $${paramIndex}`);
      values.push(startX);
      paramIndex++;
    }
    if (startY !== undefined) {
      fields.push(`start_y = $${paramIndex}`);
      values.push(startY);
      paramIndex++;
    }
    if (endX !== undefined) {
      fields.push(`end_x = $${paramIndex}`);
      values.push(endX);
      paramIndex++;
    }
    if (endY !== undefined) {
      fields.push(`end_y = $${paramIndex}`);
      values.push(endY);
      paramIndex++;
    }

    if (fields.length === 0) {
      return null;
    }

    fields.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const query = `
      UPDATE annotations 
      SET ${fields.join(", ")}
      WHERE id = $${paramIndex}
      RETURNING *
    `;

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async delete(id) {
    const query = `DELETE FROM annotations WHERE id = $1 RETURNING *`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async createBatch(imageId, annotations) {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const createdAnnotations = [];

      for (const ann of annotations) {
        const query = `
          INSERT INTO annotations (image_id, start_x, start_y, end_x, end_y, label)
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING *
        `;

        const values = [
          imageId,
          ann.startX,
          ann.startY,
          ann.endX,
          ann.endY,
          ann.label,
        ];
        const result = await client.query(query, values);
        createdAnnotations.push(result.rows[0]);
      }

      await client.query("COMMIT");
      return createdAnnotations;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }
}

export default Annotation;
