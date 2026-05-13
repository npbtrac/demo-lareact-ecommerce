<?php

namespace Tests\Unit;

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductTest extends TestCase
{
    use RefreshDatabase;

    public function test_product_has_fillable_attributes(): void
    {
        $product = new Product;
        $this->assertEquals(['name', 'description', 'price', 'stock'], $product->getFillable());
    }

    public function test_product_casts_price_to_decimal(): void
    {
        $product = Product::factory()->create(['price' => 19.99]);
        $this->assertEquals('19.99', $product->price);
    }

    public function test_product_casts_stock_to_integer(): void
    {
        $product = Product::factory()->create(['stock' => 42]);
        $this->assertIsInt($product->stock);
    }

    public function test_product_factory_creates_valid_product(): void
    {
        $product = Product::factory()->create();

        $this->assertNotEmpty($product->name);
        $this->assertNotNull($product->price);
        $this->assertNotNull($product->stock);
    }
}
