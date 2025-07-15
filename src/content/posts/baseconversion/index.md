---
title: "基数変換アルゴリズムの妥当性の証明"
pubDate: 2025-07-15
description: ""
tags: ["アルゴリズム", "数学"]
---

$m$桁の$A$進数$\alpha$は、

$$
\alpha = \sum_{k=0}^{m-1} a_k A^k, \quad a_k = \left\lfloor \frac{\alpha}{A^k} \right\rfloor \bmod Aより
$$

<br />

$$
\alpha = \sum_{k=0}^{m-1} \left( \left\lfloor \frac{\alpha}{A^k} \right\rfloor \bmod A \right) \cdot A^k
$$

と表される。

<br />

同様に、$n$桁の$B$進数$\beta$は、

<br />

$$
\beta = \sum_{k=0}^{n-1} \left( \left\lfloor \frac{\beta}{B^k} \right\rfloor \bmod B \right) \cdot B^k
$$

<br />

と表される。

<br />

値は等しいので、

<br />

$$
\sum_{k=0}^{m-1} \left( \left\lfloor \frac{\alpha}{A^k} \right\rfloor \bmod A \right) \cdot A^k
= \sum_{k=0}^{n-1} \left( \left\lfloor \frac{\beta}{B^k} \right\rfloor \bmod B \right) \cdot B^k = \alpha
$$

<br />

よって

<br />

$$
\alpha = \sum_{k=0}^{n-1} b_k B^k
$$

<br />

$k$を改めて$j$に置き換えると、

<br />

$$
\alpha = \sum_{j=0}^{n-1} b_j B^j
$$

<br />

$\forall k \in \{0, 1, \dots, n-1\}$ について、右辺を$B^k$で括ると、

<br />

$$
\alpha = B^k \cdot \sum_{j=0}^{n-1} b_j B^{j-k}
$$

<br />

両辺を$B^k$で割ると、

<br />

$$
\frac{\alpha}{B^k} = \sum_{j=0}^{n-1} b_j B^{j-k}
= \sum_{j=0}^{k-1} b_j B^{j-k} + \sum_{j=k}^{n-1} b_j B^{j-k}
$$

<br />

この値を床関数で切り捨てると、

<br />

$$
\left\lfloor \frac{\alpha}{B^k} \right\rfloor
= \left\lfloor \sum_{j=0}^{k-1} b_j B^{j-k} + \sum_{j=k}^{n-1} b_j B^{j-k} \right\rfloor
= 0 + \sum_{j=k}^{n-1} b_j B^{j-k}
$$

<br />

ただし $b_j B^{j-k}$ は $B$ の倍数なので、右辺に $\bmod B$ を作用させると、

<br />

$$
\left\lfloor \frac{\alpha}{B^k} \right\rfloor \bmod B
= \left( \sum_{j=k}^{n-1} b_j B^{j-k} \right) \bmod B
= b_k
$$

<br />

したがって、$B$進数における各桁 $b_k$ の計算公式は、

<br />

$$
\boxed{b_k = \left\lfloor \frac{\alpha}{B^k} \right\rfloor \bmod B}
$$

<br />
