import pool from "../config/database.js";

class Image {
  static async create(imageData) {
    const { fileName, filePath, fileSize, width, height } = imageData;

    const query = `
      INSERT INTO images (file_name, file_path, file_size, width, height)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;

    const values = [fileName, filePath, fileSize, width, height];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findAll() {
    const query = `
      SELECT 
        i.*,
        COUNT(a.id) as annotation_count
      FROM images i
      LEFT JOIN annotations a ON i.id = a.image_id
      GROUP BY i.id
      ORDER BY i.created_at DESC
    `;

    const result = await pool.query(query);
    return result.rows;
  }

  static async findById(id) {
    const imageQuery = `SELECT * FROM images WHERE id = $1`;
    const annotationsQuery = `SELECT * FROM annotations WHERE image_id = $1`;

    const imageResult = await pool.query(imageQuery, [id]);
    const annotationsResult = await pool.query(annotationsQuery, [id]);

    if (imageResult.rows.length === 0) {
      return null;
    }

    return {
      ...imageResult.rows[0],
      annotations: annotationsResult.rows,
    };
  }

  static async delete(id) {
    const query = `DELETE FROM images WHERE id = $1 RETURNING *`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async update(id, updates) {
    const { width, height } = updates;
    const query = `
      UPDATE images 
      SET width = $1, height = $2, updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING *
    `;

    const result = await pool.query(query, [width, height, id]);
    return result.rows[0];
  }
}

export default Image;
